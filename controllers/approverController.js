const Form = require("../models/Form");

// @desc   Get all pending forms for review
// @route  GET /api/approver/pending
// @access Approver Only
const getPendingForms = async (req, res) => {
  try {
    const forms = await Form.find({ status: "Pending Approval" });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Approve or reject a form
// @route  PUT /api/approver/review/:id
// @access Approver Only
const reviewForm = async (req, res) => {
  try {
    const { status, comments } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.status !== "Pending Approval") {
      return res.status(400).json({ message: "Form is not pending approval" });
    }

    form.status = status;
    form.approver = req.user._id;
    form.comments = comments || "";

    await form.save();
    res.json({ message: `Form ${status.toLowerCase()} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get approver's dashboard
// @route  GET /api/approver/dashboard
// @access Approver Only
const getApproverDashboard = async (req, res) => {
  try {
    const pendingForms = await Form.find({ status: "Pending Approval" });

    res.json({ pendingForms });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPendingForms, reviewForm, getApproverDashboard };

const Form = require("../models/Form");

// @desc   Create a new form
// @route  POST /api/forms
// @access Submitter Only
const createForm = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title || title.length > 50) {
      return res.status(400).json({ message: "Title is required and must be under 50 characters." });
    }

    const newForm = new Form({
      title,
      description,
      fileUrl,
      submitter: req.user._id,
      status: "Draft",
    });

    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update form (only if it's a draft)
// @route  PUT /api/forms/:id
// @access Submitter Only
const updateForm = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;
    const form = await Form.findById(req.params.id);

    if (!form || form.submitter.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.status !== "Draft") {
      return res.status(400).json({ message: "Cannot edit a submitted form" });
    }

    form.title = title || form.title;
    form.description = description || form.description;
    form.fileUrl = fileUrl || form.fileUrl;

    await form.save();
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Submit form for approval
// @route  PUT /api/forms/submit/:id
// @access Submitter Only
const submitForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form || form.submitter.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.status !== "Draft") {
      return res.status(400).json({ message: "Form already submitted" });
    }

    form.status = "Pending Approval";
    await form.save();

    res.json({ message: "Form submitted for approval" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get submitter's dashboard
// @route  GET /api/forms/dashboard
// @access Submitter Only
const getSubmitterDashboard = async (req, res) => {
  try {
    const drafts = await Form.find({ submitter: req.user._id, status: "Draft" });
    const pending = await Form.find({ submitter: req.user._id, status: "Pending Approval" });
    const approved = await Form.find({ submitter: req.user._id, status: "Approved" });
    const rejected = await Form.find({ submitter: req.user._id, status: "Rejected" });

    res.json({ drafts, pending, approved, rejected });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createForm,
  updateForm,
  submitForm,
  getSubmitterDashboard,
};

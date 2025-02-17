const express = require("express");
const { getPendingForms, reviewForm, getApproverDashboard } = require("../controllers/approverController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/pending", protect, authorizeRoles("approver"), getPendingForms);
router.put("/review/:id", protect, authorizeRoles("approver"), reviewForm);
router.get("/dashboard", protect, authorizeRoles("approver"), getApproverDashboard);

module.exports = router;

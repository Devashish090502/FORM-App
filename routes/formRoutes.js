const express = require("express");
const { 
  createForm, 
  updateForm, 
  submitForm, 
  getSubmitterDashboard 
} = require("../controllers/formController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("submitter"), createForm);
router.put("/:id", protect, authorizeRoles("submitter"), updateForm);
router.put("/submit/:id", protect, authorizeRoles("submitter"), submitForm);
router.get("/dashboard", protect, authorizeRoles("submitter"), getSubmitterDashboard);

module.exports = router;

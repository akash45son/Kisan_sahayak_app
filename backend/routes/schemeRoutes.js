const express = require("express");
const router = express.Router();
const { getSchemes } = require("../controllers/schemeController");
const protect = require("../middleware/authMiddleware");

// 🔽 Get all schemes OR filter by category
// Example:
// GET /api/schemes
// GET /api/schemes?category=insurance_risk
router.get("/", protect, getSchemes);

module.exports = router;

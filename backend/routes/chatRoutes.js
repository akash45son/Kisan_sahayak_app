const express = require("express");//Express is a Node.js framework used to build backend servers and APIs easily.
const router = express.Router();
const { chatWithAI } = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware");
router.post("/", protect, chatWithAI);

module.exports = router;

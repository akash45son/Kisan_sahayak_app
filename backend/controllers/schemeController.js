const Scheme = require("../models/Scheme");

// Get all schemes OR filter by category
exports.getSchemes = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    // 🔽 Apply category filter only if it's not "all"
    if (category && category !== "all") {
      filter.category = category;
    }

    const schemes = await Scheme.find(filter).sort({ createdAt: -1 });

    res.json(schemes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch schemes" });
  }
};

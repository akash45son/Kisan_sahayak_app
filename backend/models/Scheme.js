const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔽 6 Major Categories
    category: {
      type: String,
      enum: [
        "income_support",      // Income & Welfare Schemes
        "subsidy_support",     // Seeds, Fertilizer, Input Subsidy
        "irrigation_infra",    // Irrigation & Infrastructure
        "insurance_risk",      // Crop / Livestock Insurance
        "credit_finance",      // Loans, Credit, Interest Support
        "training_social",     // Training, Marketing, Pension
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    officialUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);

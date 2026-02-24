// const mongoose = require("mongoose");

// const schemeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // 🔽 6 Major Categories
//     category: {
//       type: String,
//       enum: [
//         "income_support",      // Income & Welfare Schemes
//         "subsidy_support",     // Seeds, Fertilizer, Input Subsidy
//         "irrigation_infra",    // Irrigation & Infrastructure
//         "insurance_risk",      // Crop / Livestock Insurance
//         "credit_finance",      // Loans, Credit, Interest Support
//         "training_social",     // Training, Marketing, Pension
//       ],
//       required: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     officialUrl: {
//       type: String,
//       required: true,
//     },
    
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Scheme", schemeSchema);




//new code
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
        "income_support",
        "subsidy_support",
        "irrigation_infra",
        "insurance_risk",
        "credit_finance",
        "training_social",
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

    // ✅ ELIGIBILITY FIELDS (for Eligibility Checker feature)
    eligibility: {
      // List of eligible states. Empty array = nationwide (all states)
      states: {
        type: [String],
        default: [], // [] means available in ALL states
      },
      // Land size in acres
      minLand: {
        type: Number,
        default: 0, // minimum land required (0 = no minimum)
      },
      maxLand: {
        type: Number,
        default: 999, // maximum land allowed (999 = no limit)
      },
      // Annual income in rupees
      maxIncome: {
        type: Number,
        default: 999999999, // no income limit by default
      },
      // Eligible crop types. Empty array = all crops
      cropTypes: {
        type: [String],
        default: [], // [] means all crops are eligible
      },
      // Minimum age
      minAge: {
        type: Number,
        default: 18,
      },
      // Maximum age
      maxAge: {
        type: Number,
        default: 99,
      },
    },

    // ✅ DOCUMENT CHECKLIST (for Document Checklist Generator feature)
    documents: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
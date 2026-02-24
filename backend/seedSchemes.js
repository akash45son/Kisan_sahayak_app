// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Scheme = require("./models/Scheme");

// dotenv.config();

// const seedData = async () => {
//   try {
//     console.log("Connecting to MongoDB...");

//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB Connected ✅");

//   const schemes = [

//   // ================= INCOME SUPPORT =================
//   {
//     name: "PM Kisan Samman Nidhi",
//     category: "income_support",
//     description:
//       "1) What is the scheme: Provides ₹6000 per year income support to eligible farmers.\n\n2) Eligibility: Small and marginal landholding farmers.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land ownership records, Bank account details, Mobile number.",
//     officialUrl: "https://pmkisan.gov.in",
//     pdfUrl: "https://pmkisan.gov.in/pdf/PMKisan_Samman_Nidhi.pdf"
//   },
//   {
//     name: "Pradhan Mantri Kisan Maandhan Yojana",
//     category: "income_support",
//     description:
//       "1) What is the scheme: Pension scheme providing ₹3000 per month after age 60.\n\n2) Eligibility: Farmers aged 18–40 years with small landholdings.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Age proof, Land records, Bank account details, Passport size photo.",
//     officialUrl: "https://maandhan.in",
//   },

//   // ================= INSURANCE =================
//   {
//     name: "Pradhan Mantri Fasal Bima Yojana",
//     category: "insurance_risk",
//     description:
//       "1) What is the scheme: Crop insurance against natural calamities and pests.\n\n2) Eligibility: Farmers growing notified crops.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Crop sowing certificate, Bank account details, Insurance application form.",
//     officialUrl: "https://pmfby.gov.in",
//   },
//   {
//     name: "Weather Based Crop Insurance Scheme",
//     category: "insurance_risk",
//     description:
//       "1) What is the scheme: Insurance against adverse weather conditions.\n\n2) Eligibility: Farmers growing notified crops.\n\n3) Coverage: Implemented in multiple states.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Crop details, Bank account details.",
//     officialUrl: "https://pmfby.gov.in",
//   },

//   // ================= SUBSIDY =================
//   {
//     name: "Sub-Mission on Agricultural Mechanization",
//     category: "subsidy_support",
//     description:
//       "1) What is the scheme: Subsidy for purchasing agricultural machinery.\n\n2) Eligibility: Individual farmers and farmer groups.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land documents, Quotation of machinery, Bank details, Passport size photo.",
//     officialUrl: "https://agrimachinery.nic.in",
//   },
//   {
//     name: "Solar Pump Subsidy Scheme",
//     category: "subsidy_support",
//     description:
//       "1) What is the scheme: Subsidy for installing solar irrigation pumps.\n\n2) Eligibility: Farmers requiring irrigation support.\n\n3) Coverage: Nationwide with state execution.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Electricity connection details, Bank account details.",
//     officialUrl: "https://mnre.gov.in",
//   },
//   {
//     name: "Drip Irrigation Subsidy",
//     category: "subsidy_support",
//     description:
//       "1) What is the scheme: Financial assistance for drip irrigation systems.\n\n2) Eligibility: Farmers adopting micro-irrigation.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Irrigation layout plan, Bank details.",
//     officialUrl: "https://pmksy.gov.in",
//   },
//   {
//     name: "Soil Health Card Scheme",
//     category: "subsidy_support",
//     description:
//       "1) What is the scheme: Provides soil health reports and fertilizer guidance.\n\n2) Eligibility: All farmers.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land details, Application form submitted at agriculture office.",
//     officialUrl: "https://soilhealth.dac.gov.in",
//   },

//   // ================= CREDIT =================
//   {
//     name: "Kisan Credit Card (KCC)",
//     category: "credit_finance",
//     description:
//       "1) What is the scheme: Provides short-term loans at low interest rates.\n\n2) Eligibility: Farmers engaged in agriculture and allied activities.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Income proof, Bank account details, Passport size photo.",
//     officialUrl: "https://pmkisan.gov.in/KisanCreditCard.aspx",
//   },
//   {
//     name: "Agricultural Term Loan Scheme",
//     category: "credit_finance",
//     description:
//       "1) What is the scheme: Long-term loan support for farm infrastructure.\n\n2) Eligibility: Farmers and agri-entrepreneurs.\n\n3) Coverage: Nationwide through banks.\n\n4) Documents Required: Aadhaar Card, Project proposal, Land documents, Income proof, Bank statements.",
//     officialUrl: "https://nabard.org",
//   },
//   {
//     name: "Interest Subvention Scheme",
//     category: "credit_finance",
//     description:
//       "1) What is the scheme: Reduced interest rates on crop loans.\n\n2) Eligibility: Farmers with crop loans.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Loan documents, Bank account details, Land records.",
//     officialUrl: "https://agricoop.nic.in",
//   },

//   // ================= IRRIGATION =================
//   {
//     name: "Pradhan Mantri Krishi Sinchayee Yojana",
//     category: "irrigation_infra",
//     description:
//       "1) What is the scheme: Improves irrigation coverage and water efficiency.\n\n2) Eligibility: Farmers requiring irrigation systems.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Irrigation project details, Bank account details.",
//     officialUrl: "https://pmksy.gov.in",
//   },
//   {
//     name: "Watershed Development Programme",
//     category: "irrigation_infra",
//     description:
//       "1) What is the scheme: Focuses on soil and water conservation.\n\n2) Eligibility: Farmers in rain-fed areas.\n\n3) Coverage: Implemented in selected districts.\n\n4) Documents Required: Aadhaar Card, Land records, Residence proof, Application form.",
//     officialUrl: "https://agricoop.nic.in",
//   },
//   {
//     name: "Cold Storage Infrastructure Scheme",
//     category: "irrigation_infra",
//     description:
//       "1) What is the scheme: Financial support for building cold storage facilities.\n\n2) Eligibility: Farmers and cooperatives.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land documents, Project report, Bank account details.",
//     officialUrl: "https://nabard.org",
//   },

//   // ================= TRAINING =================
//   {
//     name: "Paramparagat Krishi Vikas Yojana",
//     category: "training_social",
//     description:
//       "1) What is the scheme: Promotes organic farming practices.\n\n2) Eligibility: Farmers willing to adopt organic methods.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Registration form, Bank account details.",
//     officialUrl: "https://pgsindia-ncof.gov.in",
//   },
//   {
//     name: "Krishi Vigyan Kendra Training",
//     category: "training_social",
//     description:
//       "1) What is the scheme: Agricultural skill training programs.\n\n2) Eligibility: All farmers.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Registration form, Land details (if required).",
//     officialUrl: "https://kvk.icar.gov.in",
//   },
//   {
//     name: "National Agriculture Market (e-NAM)",
//     category: "training_social",
//     description:
//       "1) What is the scheme: Online trading platform for better price discovery.\n\n2) Eligibility: Registered farmers and traders.\n\n3) Coverage: Nationwide digital platform.\n\n4) Documents Required: Aadhaar Card, Bank account details, Mobile number, Market registration details.",
//     officialUrl: "https://www.enam.gov.in",
//   },
//   {
//     name: "Agri Entrepreneurship Development Program",
//     category: "training_social",
//     description:
//       "1) What is the scheme: Supports farmers in starting agri-based businesses.\n\n2) Eligibility: Farmers and rural youth.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Project proposal, Bank account details, Land documents (if applicable).",
//     officialUrl: "https://nabard.org",
//   }
// ];
//     console.log("Deleting old schemes...");
//     await Scheme.deleteMany();

//     console.log("Inserting new schemes...");
//     await Scheme.insertMany(schemes);

//     console.log("✅ Schemes seeded successfully!");

//     process.exit();

//   } catch (error) {
//     console.error("❌ Error:", error);
//     process.exit(1);
//   }
// };

// seedData();


//new code
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Scheme = require("./models/Scheme");

dotenv.config();

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    const schemes = [

      // ================= INCOME SUPPORT =================
      {
        name: "PM Kisan Samman Nidhi",
        category: "income_support",
        description:
          "1) What is the scheme: Provides ₹6000 per year income support to eligible farmers in 3 installments of ₹2000 each.\n\n2) Eligibility: Small and marginal landholding farmers with land up to 2 hectares.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land ownership records, Bank account details, Mobile number.",
        officialUrl: "https://pmkisan.gov.in",
        eligibility: {
          states: [],           // all states
          minLand: 0,
          maxLand: 5,           // up to ~2 hectares (5 acres)
          maxIncome: 200000,    // small/marginal farmers
          cropTypes: [],        // all crops
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Ownership Records (Khasra/Khatauni)",
          "Bank Account Passbook (with IFSC)",
          "Mobile Number linked to Aadhaar",
          "Passport Size Photo",
        ],
      },

      {
        name: "Pradhan Mantri Kisan Maandhan Yojana",
        category: "income_support",
        description:
          "1) What is the scheme: Pension scheme providing ₹3000 per month after age 60 for small and marginal farmers.\n\n2) Eligibility: Farmers aged 18–40 years with small landholdings up to 2 hectares.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Age proof, Land records, Bank account details, Passport size photo.",
        officialUrl: "https://maandhan.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 5,
          maxIncome: 200000,
          cropTypes: [],
          minAge: 18,
          maxAge: 40,           // enrollment age limit
        },
        documents: [
          "Aadhaar Card",
          "Age Proof (Birth Certificate / School Certificate)",
          "Land Records (Khasra/Khatauni)",
          "Bank Account Passbook",
          "Passport Size Photo",
        ],
      },

      // ================= INSURANCE =================
      {
        name: "Pradhan Mantri Fasal Bima Yojana",
        category: "insurance_risk",
        description:
          "1) What is the scheme: Crop insurance against natural calamities, pests and diseases at very low premium rates.\n\n2) Eligibility: Farmers growing notified crops in notified areas.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Crop sowing certificate, Bank account details, Insurance application form.",
        officialUrl: "https://pmfby.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: ["wheat", "rice", "cotton", "maize", "soybean", "sugarcane", "vegetables", "fruits", "pulses", "oilseeds"],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records / Khasra Number",
          "Crop Sowing Certificate (from Patwari)",
          "Bank Account Passbook",
          "Insurance Application Form",
          "Mobile Number",
        ],
      },

      {
        name: "Weather Based Crop Insurance Scheme",
        category: "insurance_risk",
        description:
          "1) What is the scheme: Insurance against adverse weather conditions like drought, flood, frost, and excess rain.\n\n2) Eligibility: Farmers growing notified crops in participating states.\n\n3) Coverage: Implemented in multiple states.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Crop details, Bank account details.",
        officialUrl: "https://pmfby.gov.in",
        eligibility: {
          states: ["Maharashtra", "Karnataka", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Punjab", "Haryana", "Gujarat", "Andhra Pradesh", "Telangana"],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: ["wheat", "rice", "cotton", "maize", "soybean", "pulses", "oilseeds"],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Ownership Proof",
          "Crop Sowing Details",
          "Bank Account Passbook",
          "Mobile Number",
        ],
      },

      // ================= SUBSIDY =================
      {
        name: "Sub-Mission on Agricultural Mechanization",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Subsidy of 40–50% for purchasing agricultural machinery like tractors, harvesters, and implements.\n\n2) Eligibility: Individual farmers and farmer groups (SC/ST get higher subsidy).\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land documents, Quotation of machinery, Bank details, Passport size photo.",
        officialUrl: "https://agrimachinery.nic.in",
        eligibility: {
          states: [],
          minLand: 0.5,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Documents (Khasra/Patta)",
          "Quotation from Authorized Dealer",
          "Bank Account Passbook",
          "Passport Size Photo",
          "Caste Certificate (for SC/ST higher subsidy)",
        ],
      },

      {
        name: "Solar Pump Subsidy Scheme (PM-KUSUM)",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Subsidy up to 60% for installing solar irrigation pumps, reducing electricity costs.\n\n2) Eligibility: Farmers requiring irrigation support with agricultural land.\n\n3) Coverage: Nationwide with state execution.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Electricity connection details, Bank account details.",
        officialUrl: "https://mnre.gov.in",
        eligibility: {
          states: [],
          minLand: 0.5,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Ownership Proof",
          "Electricity Connection Details / Bill",
          "Bank Account Passbook",
          "Passport Size Photo",
          "Mobile Number",
        ],
      },

      {
        name: "Drip Irrigation Subsidy (PMKSY-MIS)",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Financial assistance of 55–75% for installing drip and sprinkler irrigation systems.\n\n2) Eligibility: Farmers adopting micro-irrigation with at least 0.5 acres of land.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Irrigation layout plan, Bank details.",
        officialUrl: "https://pmksy.gov.in",
        eligibility: {
          states: [],
          minLand: 0.5,
          maxLand: 5,           // per scheme guidelines for subsidy
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records (Khasra/7-12 Extract)",
          "Irrigation Layout Plan (from Agriculture Dept.)",
          "Bank Account Passbook",
          "Quotation from Empaneled Vendor",
        ],
      },

      {
        name: "Soil Health Card Scheme",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Provides free soil health reports and fertilizer/crop recommendations every 2 years.\n\n2) Eligibility: All farmers with agricultural land.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land details, Application form submitted at agriculture office.",
        officialUrl: "https://soilhealth.dac.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Details (Survey Number / Khasra Number)",
          "Application Form (from Agriculture Office)",
        ],
      },

      // ================= CREDIT =================
      {
        name: "Kisan Credit Card (KCC)",
        category: "credit_finance",
        description:
          "1) What is the scheme: Provides short-term crop loans at 4% interest rate (with timely repayment benefit).\n\n2) Eligibility: Farmers engaged in agriculture and allied activities.\n\n3) Coverage: Nationwide through all banks.\n\n4) Documents Required: Aadhaar Card, Land records, Income proof, Bank account details, Passport size photo.",
        officialUrl: "https://pmkisan.gov.in/KisanCreditCard.aspx",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 75,
        },
        documents: [
          "Aadhaar Card",
          "Land Records / Khasra",
          "Income Proof / Revenue Documents",
          "Bank Account Passbook",
          "Passport Size Photo",
          "PAN Card (for loans above ₹50,000)",
        ],
      },

      {
        name: "Agricultural Term Loan Scheme",
        category: "credit_finance",
        description:
          "1) What is the scheme: Long-term loan support (up to 15 years) for farm infrastructure like land development, farm houses, and equipment.\n\n2) Eligibility: Farmers and agri-entrepreneurs with viable project.\n\n3) Coverage: Nationwide through NABARD-linked banks.\n\n4) Documents Required: Aadhaar Card, Project proposal, Land documents, Income proof, Bank statements.",
        officialUrl: "https://nabard.org",
        eligibility: {
          states: [],
          minLand: 1,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 65,
        },
        documents: [
          "Aadhaar Card",
          "Detailed Project Proposal / DPR",
          "Land Documents",
          "Income Proof (last 3 years)",
          "Bank Statements (last 6 months)",
          "PAN Card",
          "Passport Size Photo",
        ],
      },

      {
        name: "Interest Subvention Scheme",
        category: "credit_finance",
        description:
          "1) What is the scheme: Provides 2% interest subvention on short-term crop loans up to ₹3 lakh, making effective rate 4%.\n\n2) Eligibility: Farmers with short-term crop loans from scheduled banks.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Loan documents, Bank account details, Land records.",
        officialUrl: "https://agricoop.nic.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Existing Crop Loan Documents",
          "Bank Account Passbook",
          "Land Records",
        ],
      },

      // ================= IRRIGATION =================
      {
        name: "Pradhan Mantri Krishi Sinchayee Yojana",
        category: "irrigation_infra",
        description:
          "1) What is the scheme: Ensures water availability for every farm (Har Khet Ko Pani) and improves water use efficiency (More Crop Per Drop).\n\n2) Eligibility: Farmers requiring irrigation systems and water source development.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land ownership proof, Irrigation project details, Bank account details.",
        officialUrl: "https://pmksy.gov.in",
        eligibility: {
          states: [],
          minLand: 0.5,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Ownership Proof",
          "Irrigation Project Details / Layout",
          "Bank Account Passbook",
          "Application Form from Agriculture Department",
        ],
      },

      {
        name: "Watershed Development Programme",
        category: "irrigation_infra",
        description:
          "1) What is the scheme: Focuses on soil and water conservation in rain-fed areas through community-based watershed management.\n\n2) Eligibility: Farmers in rain-fed and drought-prone areas.\n\n3) Coverage: Implemented in selected districts.\n\n4) Documents Required: Aadhaar Card, Land records, Residence proof, Application form.",
        officialUrl: "https://agricoop.nic.in",
        eligibility: {
          states: ["Rajasthan", "Maharashtra", "Karnataka", "Madhya Pradesh", "Gujarat", "Andhra Pradesh", "Telangana", "Odisha", "Jharkhand", "Chhattisgarh"],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records",
          "Residence Proof",
          "Application Form (from Block Agriculture Office)",
        ],
      },

      {
        name: "Cold Storage Infrastructure Scheme",
        category: "irrigation_infra",
        description:
          "1) What is the scheme: Financial support and subsidy for building cold storage facilities for perishable farm produce.\n\n2) Eligibility: Farmers, cooperatives, and farmer producer organizations (FPOs).\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land documents, Detailed project report, Bank account details.",
        officialUrl: "https://nabard.org",
        eligibility: {
          states: [],
          minLand: 1,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: ["vegetables", "fruits"],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Documents / Lease Agreement",
          "Detailed Project Report (DPR)",
          "Bank Account Passbook",
          "PAN Card",
          "FPO/Cooperative Registration Certificate (if applicable)",
        ],
      },

      // ================= TRAINING =================
      {
        name: "Paramparagat Krishi Vikas Yojana",
        category: "training_social",
        description:
          "1) What is the scheme: Promotes organic farming through cluster-based approach with financial support of ₹50,000/hectare over 3 years.\n\n2) Eligibility: Farmers willing to adopt organic methods and form clusters of 50 farmers.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land records, Registration form, Bank account details.",
        officialUrl: "https://pgsindia-ncof.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records",
          "Registration Form (through Agriculture Dept.)",
          "Bank Account Passbook",
          "Group/Cluster Formation Certificate",
        ],
      },

      {
        name: "Krishi Vigyan Kendra Training",
        category: "training_social",
        description:
          "1) What is the scheme: Free agricultural skill training programs covering modern farming, pest management, and new crop varieties.\n\n2) Eligibility: All farmers and rural youth.\n\n3) Coverage: Nationwide (one KVK per district).\n\n4) Documents Required: Aadhaar Card, Registration form, Land details (if required).",
        officialUrl: "https://kvk.icar.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Registration Form (from local KVK office)",
          "Land Details (optional)",
        ],
      },

      {
        name: "National Agriculture Market (e-NAM)",
        category: "training_social",
        description:
          "1) What is the scheme: Online trading platform connecting farmers directly to buyers for better price discovery and transparent sales.\n\n2) Eligibility: Registered farmers and traders with produce to sell.\n\n3) Coverage: Nationwide digital platform.\n\n4) Documents Required: Aadhaar Card, Bank account details, Mobile number, Market registration details.",
        officialUrl: "https://www.enam.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Bank Account Passbook",
          "Mobile Number (for OTP)",
          "APMC Market Registration / Trader License",
          "Passport Size Photo",
        ],
      },

      {
        name: "Agri Entrepreneurship Development Program",
        category: "training_social",
        description:
          "1) What is the scheme: Supports farmers and rural youth in starting agri-based businesses through training, mentorship and funding linkages.\n\n2) Eligibility: Farmers and rural youth interested in agri-business.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Project proposal, Bank account details, Land documents (if applicable).",
        officialUrl: "https://nabard.org",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 45,
        },
        documents: [
          "Aadhaar Card",
          "Business / Project Proposal",
          "Bank Account Passbook",
          "Land Documents (if applicable)",
          "Educational Certificate",
          "Passport Size Photo",
        ],
      },

      // ================= 2 NEW SCHEMES (making total 20) =================
      {
        name: "Rashtriya Krishi Vikas Yojana (RKVY)",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Provides funds to states for holistic agricultural development including infrastructure, technology adoption, and post-harvest management.\n\n2) Eligibility: All farmers; state governments identify beneficiaries.\n\n3) Coverage: Nationwide.\n\n4) Documents Required: Aadhaar Card, Land Records, Bank account details, Application through State Agriculture Dept.",
        officialUrl: "https://rkvy.nic.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: [],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records",
          "Bank Account Passbook",
          "Application Form (from State Agriculture Department)",
          "Passport Size Photo",
        ],
      },

      {
        name: "National Food Security Mission (NFSM)",
        category: "subsidy_support",
        description:
          "1) What is the scheme: Provides subsidized seeds, fertilizers, and farming tools to increase production of rice, wheat, pulses, and coarse cereals.\n\n2) Eligibility: Farmers growing rice, wheat, pulses, or coarse cereals in selected districts.\n\n3) Coverage: Selected districts across India.\n\n4) Documents Required: Aadhaar Card, Land Records, Crop details, Bank account details.",
        officialUrl: "https://nfsm.gov.in",
        eligibility: {
          states: [],
          minLand: 0,
          maxLand: 999,
          maxIncome: 999999999,
          cropTypes: ["wheat", "rice", "pulses", "maize"],
          minAge: 18,
          maxAge: 99,
        },
        documents: [
          "Aadhaar Card",
          "Land Records (Khasra)",
          "Crop Cultivation Details",
          "Bank Account Passbook",
          "Application Form (from local Agriculture Office)",
        ],
      },
    ];

    console.log("Deleting old schemes...");
    await Scheme.deleteMany();

    console.log("Inserting new schemes...");
    await Scheme.insertMany(schemes);

    console.log(`✅ ${schemes.length} Schemes seeded successfully!`);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedData();
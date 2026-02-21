const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Scheme = require("./models/Scheme");

dotenv.config();

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// 🌾 Seed Data with NEW 6 Categories
const schemes = [
  {
    name: "PM Kisan Samman Nidhi",
    category: "income_support",
    description: "Income support of ₹6000 per year to eligible farmers.",
    officialUrl: "https://pmkisan.gov.in",
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "insurance_risk",
    description: "Crop insurance against natural calamities.",
    officialUrl: "https://pmfby.gov.in",
  },
  {
    name: "Soil Health Card Scheme",
    category: "subsidy_support",
    description: "Provides soil health information to farmers.",
    officialUrl: "https://soilhealth.dac.gov.in",
  },
  {
  name: "Kisan Credit Card (KCC)",
  category: "credit_finance",
  description:
    "Provides timely and affordable credit to farmers for crop cultivation and allied agricultural activities.",
  officialUrl: "https://pmkisan.gov.in/KisanCreditCard.aspx",
},
{
  name: "Pradhan Mantri Krishi Sinchayee Yojana",
  category: "irrigation_infra",
  description:
    "Aims to improve irrigation efficiency and ensure access to water through micro-irrigation and watershed development.",
  officialUrl: "https://pmksy.gov.in",
},
{
  name: "Paramparagat Krishi Vikas Yojana",
  category: "training_social",
  description:
    "Promotes organic farming practices by providing training and financial assistance to farmers.",
  officialUrl: "https://pgsindia-ncof.gov.in",
},
{
  name: "National Agriculture Market (e-NAM)",
  category: "training_social",
  description:
    "An online trading platform that enables farmers to sell produce transparently and get better prices.",
  officialUrl: "https://www.enam.gov.in",
},
{
  name: "Sub-Mission on Agricultural Mechanization",
  category: "subsidy_support",
  description:
    "Provides subsidies for purchasing modern agricultural machinery and equipment.",
  officialUrl: "https://agrimachinery.nic.in",
},
{
  name: "Pradhan Mantri Kisan Maandhan Yojana",
  category: "training_social",
  description:
    "A pension scheme that provides ₹3000 per month to small and marginal farmers after the age of 60.",
  officialUrl: "https://maandhan.in",
}

];

// 🌱 Seed Function
const seedData = async () => {
  try {
    await Scheme.deleteMany(); // delete existing schemes
    await Scheme.insertMany(schemes); // insert updated schemes
    console.log("✅ Schemes seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding schemes:", error);
    process.exit(1);
  }
};

seedData();

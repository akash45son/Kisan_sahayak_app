const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please ask a question.",
      });
    }

    const response = await cohere.chat({
      model: "c4ai-aya-23",
      message: message,
      preamble:
        "You are a helpful AI assistant for Indian farmers. Answer in simple, farmer-friendly language. Focus on government schemes, insurance, and financial support.",
      temperature: 0.4,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Cohere Chat Error:", error);
    res.status(500).json({
      reply: "Sorry, I am unable to answer right now.",
    });
  }
};

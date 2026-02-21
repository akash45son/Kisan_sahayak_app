// 🔐 Protect page (redirect if not logged in)
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 🧠 Function to add messages to chat
const addMessage = (text, className) => {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// 👋 Initial welcome message (UX improvement)
addMessage(
  "Hello 👋 I can help you with government schemes, insurance, and financial support.",
  "bot"
);

// 💬 Send message function
const sendMessage = async () => {
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  addMessage(message, "user");
  input.value = "";

  // Disable button while loading
  sendBtn.disabled = true;

  // Typing indicator
  addMessage("Typing...", "bot");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Remove "Typing..."
    chatBox.lastChild.remove();

    // Show AI reply
    addMessage(data.reply, "bot");
  } catch (error) {
    chatBox.lastChild.remove();
    addMessage("Something went wrong. Please try again.", "bot");
  } finally {
    // Re-enable button
    sendBtn.disabled = false;
  }
};

// 🖱️ Send button click
sendBtn.addEventListener("click", sendMessage);

// ⌨️ Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

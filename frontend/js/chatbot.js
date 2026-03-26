// 🔐 Protect page
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const chatBox     = document.getElementById("chatBox");
const input       = document.getElementById("userInput");
const sendBtn     = document.getElementById("sendBtn");
const micBtn      = document.getElementById("micBtn");
const voiceStatus = document.getElementById("voiceStatus");

// ── Translation helper ──
const lang = () => localStorage.getItem("lang") || "en";
const t = {
  welcome:       { en: "Hello 👋 I can help you with government schemes, insurance, and financial support. You can also tap 🎤 to speak in Hindi or English!", hi: "नमस्ते 👋 मैं सरकारी योजनाओं, बीमा और वित्तीय सहायता में आपकी मदद कर सकता हूं। आप 🎤 दबाकर हिंदी में भी बोल सकते हैं!" },
  typing:        { en: "Typing...",                     hi: "टाइप हो रहा है..." },
  error:         { en: "Something went wrong. Please try again.", hi: "कुछ गलत हो गया। कृपया दोबारा कोशिश करें।" },
  listening:     { en: "🎙️ Listening... Speak now",    hi: "🎙️ सुन रहे हैं... अभी बोलें" },
  placeholder:   { en: "Ask about schemes, insurance, support...", hi: "योजनाओं, बीमा, सहायता के बारे में पूछें..." },
  listeningPH:   { en: "Listening... speak now",       hi: "सुन रहे हैं... बोलें" },
  micDenied:     { en: "⚠️ Microphone access denied. Please allow microphone permission in your browser settings.", hi: "⚠️ माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग में माइक्रोफ़ोन की अनुमति दें।" },
  noSpeech:      { en: "⚠️ No speech detected. Please try again.", hi: "⚠️ कोई आवाज़ नहीं मिली। कृपया दोबारा कोशिश करें।" },
  voiceFailed:   { en: "⚠️ Voice input failed. Please type your question instead.", hi: "⚠️ वॉयस इनपुट विफल। कृपया अपना सवाल टाइप करें।" },
};
const tx = (key) => t[key][lang()] || t[key]["en"];

// ═══════════════════════════════════════════
//  ADD MESSAGE
// ═══════════════════════════════════════════
const addMessage = (text, className) => {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// 👋 Welcome message in current language
addMessage(tx("welcome"), "bot");

// ✅ Apply language to static HTML elements (input placeholder, buttons, voiceStatus)
if (window.applyLanguage) window.applyLanguage(lang());

// ═══════════════════════════════════════════
//  SEND MESSAGE
// ═══════════════════════════════════════════
const sendMessage = async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";
  sendBtn.disabled = true;
  addMessage(tx("typing"), "bot");

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
    chatBox.lastChild.remove();
    addMessage(data.reply, "bot");
  } catch (error) {
    chatBox.lastChild.remove();
    addMessage(tx("error"), "bot");
  } finally {
    sendBtn.disabled = false;
  }
};

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ═══════════════════════════════════════════
//  🎤 VOICE INPUT
// ═══════════════════════════════════════════
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  micBtn.style.display = "none";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  let isListening = false;

  micBtn.addEventListener("click", () => {
    if (isListening) recognition.stop();
    else recognition.start();
  });

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add("mic-active");
    micBtn.textContent = "⏹️";
    voiceStatus.style.display = "block";
    voiceStatus.textContent = tx("listening");
    input.placeholder = tx("listeningPH");
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    input.value = transcript;
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove("mic-active");
    micBtn.textContent = "🎤";
    voiceStatus.style.display = "none";
    input.placeholder = tx("placeholder");
    if (input.value.trim()) sendMessage();
  };

  recognition.onerror = (event) => {
    isListening = false;
    micBtn.classList.remove("mic-active");
    micBtn.textContent = "🎤";
    voiceStatus.style.display = "none";
    input.placeholder = tx("placeholder");

    if (event.error === "not-allowed") addMessage(tx("micDenied"), "bot");
    else if (event.error === "no-speech") addMessage(tx("noSpeech"), "bot");
    else addMessage(tx("voiceFailed"), "bot");
  };
}

// ✅ When language is toggled from navbar, update placeholder and button text live
window.addEventListener("langChanged", () => {
  if (window.applyLanguage) window.applyLanguage(lang());
  input.placeholder = tx("placeholder");
  sendBtn.textContent = tx("typing") === "टाइप हो रहा है..." ? "भेजें" : "Send";
});
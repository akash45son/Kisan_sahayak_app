document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const token = localStorage.getItem("token");

  navbar.innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="logo">🌾 Kisan Sahayak App</a>

      <div class="nav-links">
        <a href="index.html" class="nav-item">Home</a>
        <a href="schemes.html" class="nav-item">Schemes</a>
        <a href="chatbot.html" class="nav-item">Chatbot</a>
        ${
          token
            ? `<button id="logoutBtn" class="btn-logout">Logout</button>`
            : `<a href="login.html" class="btn-login">Login</a>`
        }
      </div>
    </div>
  `;

  if (token) {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Logged out successfully");
      window.location.href = "login.html";
    });
  }
});
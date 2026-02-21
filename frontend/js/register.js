const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();//prevent default browser behavior

  const name = document.getElementById("name").value;//getting input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Something went wrong");
  }
});

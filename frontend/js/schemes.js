// 🔐 Protect page (frontend)
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const container = document.getElementById("schemesContainer");
const categoryFilter = document.getElementById("categoryFilter");

// 🔽 Fetch schemes (All or by category)
const fetchSchemes = async (category = "all") => {
  try {
    const token = localStorage.getItem("token");

    let url = "http://localhost:5000/api/schemes";

    // Apply category filter (except "all")
    if (category && category !== "all") {
      url += `?category=${category}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🚨 Handle unauthorized access
    if (res.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const schemes = await res.json();

    container.innerHTML = "";

    if (!schemes || schemes.length === 0) {
      container.innerHTML = "<p>No schemes available for this category.</p>";
      return;
    }

    schemes.forEach((scheme) => {
      const div = document.createElement("div");
      div.className = "scheme-card";

      div.innerHTML = `
        <h3>${scheme.name}</h3>
        <p><strong>Category:</strong> ${formatCategory(scheme.category)}</p>
        <p>${scheme.description}</p>
        <button onclick="window.open('${scheme.officialUrl}', '_blank')">
          Official Website
        </button>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load schemes.</p>";
    console.error(error);
  }
};

// 🔄 Convert backend category to readable text
const formatCategory = (category) => {
  const map = {
    income_support: "Income Support & Welfare",
    subsidy_support: "Subsidy & Input Support",
    irrigation_infra: "Irrigation & Infrastructure",
    insurance_risk: "Insurance & Risk Protection",
    credit_finance: "Credit & Financial Support",
    training_social: "Training & Social Security",
  };

  return map[category] || category;
};

// 🔁 Dropdown change event
categoryFilter.addEventListener("change", (e) => {
  fetchSchemes(e.target.value);
});

// 🚀 Initial load → All Schemes
fetchSchemes();

// // 🔐 Protect page (frontend)
// if (!localStorage.getItem("token")) {
//   window.location.href = "login.html";
// }

// const container = document.getElementById("schemesContainer");
// const categoryFilter = document.getElementById("categoryFilter");

// // 🔽 Fetch schemes (All or by category)
// const fetchSchemes = async (category = "all") => {
//   try {
//     const token = localStorage.getItem("token");

//     let url = "http://localhost:5000/api/schemes";

//     // Apply category filter (except "all")
//     if (category && category !== "all") {
//       url += `?category=${category}`;
//     }

//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // 🚨 Handle unauthorized access
//     if (res.status === 401) {
//       alert("Session expired. Please login again.");
//       localStorage.removeItem("token");
//       window.location.href = "login.html";
//       return;
//     }

//     const schemes = await res.json();

//     container.innerHTML = "";

//     if (!schemes || schemes.length === 0) {
//       container.innerHTML = "<p>No schemes available for this category.</p>";
//       return;
//     }

//     schemes.forEach((scheme) => {
//       const div = document.createElement("div");
//       div.className = "scheme-card";

//       div.innerHTML = `
//         <h3>${scheme.name}</h3>
//         <p><strong>Category:</strong> ${formatCategory(scheme.category)}</p>
//         <p>${scheme.description}</p>
//         <button onclick="window.open('${scheme.officialUrl}', '_blank')">
//           Official Website
//         </button>
//       `;

//       container.appendChild(div);
//     });
//   } catch (error) {
//     container.innerHTML = "<p>Failed to load schemes.</p>";
//     console.error(error);
//   }
// };

// // 🔄 Convert backend category to readable text
// const formatCategory = (category) => {
//   const map = {
//     income_support: "Income Support & Welfare",
//     subsidy_support: "Subsidy & Input Support",
//     irrigation_infra: "Irrigation & Infrastructure",
//     insurance_risk: "Insurance & Risk Protection",
//     credit_finance: "Credit & Financial Support",
//     training_social: "Training & Social Security",
//   };

//   return map[category] || category;
// };

// // 🔁 Dropdown change event
// categoryFilter.addEventListener("change", (e) => {
//   fetchSchemes(e.target.value);
// });

// // 🚀 Initial load → All Schemes
// fetchSchemes();





//new code
// 🔐 Protect page (frontend)
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const container = document.getElementById("schemesContainer");
const categoryFilter = document.getElementById("categoryFilter");

// ── Store all fetched schemes globally so eligibility filter can work on them ──
let allSchemes = [];

// ═══════════════════════════════════════════
//  FETCH SCHEMES
// ═══════════════════════════════════════════
const fetchSchemes = async (category = "all") => {
  try {
    const token = localStorage.getItem("token");
    let url = "http://localhost:5000/api/schemes";
    if (category && category !== "all") {
      url += `?category=${category}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    allSchemes = await res.json();
    renderSchemes(allSchemes);
  } catch (error) {
    container.innerHTML = "<p>Failed to load schemes.</p>";
    console.error(error);
  }
};

// ═══════════════════════════════════════════
//  RENDER SCHEMES
// ═══════════════════════════════════════════
const categoryIcons = {
  income_support:  "💰",
  subsidy_support: "🌱",
  irrigation_infra:"💧",
  insurance_risk:  "🛡️",
  credit_finance:  "🏦",
  training_social: "📚",
};

const renderSchemes = (schemes) => {
  container.innerHTML = "";

  if (!schemes || schemes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>😔 No schemes match your criteria. Try adjusting the filters.</p>
      </div>`;
    return;
  }

  schemes.forEach((scheme) => {
    const div = document.createElement("div");
    div.className = "scheme-card";

    const icon = categoryIcons[scheme.category] || "📋";
    const hasDocuments = scheme.documents && scheme.documents.length > 0;

    const whatsappText = encodeURIComponent(
  `🌾 *${scheme.name}*\n\n${scheme.description.slice(0, 200)}...\n\n🔗 Official Link: ${scheme.officialUrl}`
);
const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

div.innerHTML = `
  <div class="card-icon">${icon}</div>
  <span class="scheme-tag">${formatCategory(scheme.category)}</span>
  <h3>${scheme.name}</h3>
  <p>${scheme.description}</p>
  <div class="card-buttons">
    <button class="btn-official" onclick="window.open('${scheme.officialUrl}', '_blank')">
      🌐 Official Website
    </button>
    ${hasDocuments ? `
    <button class="btn-docs" onclick="openDocModal('${scheme._id}', '${escapeStr(scheme.name)}')">
      📋 View Documents
    </button>` : ""}
    <button class="btn-whatsapp" onclick="window.open('${whatsappUrl}', '_blank')">
      📱 Share on WhatsApp
    </button>
  </div>
`;
    
    container.appendChild(div);
  });
};

// ═══════════════════════════════════════════
//  ELIGIBILITY CHECKER
// ═══════════════════════════════════════════

// Toggle open/close the eligibility form
const eligibilityToggle = document.getElementById("eligibilityToggle");
const eligibilityBody   = document.getElementById("eligibilityBody");
const toggleArrow       = document.getElementById("toggleArrow");

eligibilityToggle.addEventListener("click", () => {
  const isOpen = eligibilityBody.classList.toggle("open");
  toggleArrow.textContent = isOpen ? "▲" : "▼";
});

// Check Eligibility Button
document.getElementById("checkEligibilityBtn").addEventListener("click", () => {
  const state  = document.getElementById("stateInput").value;
  const land   = parseFloat(document.getElementById("landInput").value);
  const income = parseFloat(document.getElementById("incomeInput").value);
  const crop   = document.getElementById("cropInput").value;
  const age    = parseInt(document.getElementById("ageInput").value);

  // Validate — at least one field must be filled
  if (!state && isNaN(land) && isNaN(income) && !crop && isNaN(age)) {
    showEligibilityResult("warning", "⚠️ Please fill at least one field to check eligibility.");
    return;
  }

  // Filter allSchemes based on the current category selected too
  const eligible = allSchemes.filter((scheme) => {
    const e = scheme.eligibility;
    if (!e) return true; // if no eligibility data, show the scheme

    // State check: if scheme has specific states listed, farmer's state must be in that list
    if (state && e.states && e.states.length > 0) {
      if (!e.states.includes(state)) return false;
    }

    // Land check
    if (!isNaN(land)) {
      if (land < (e.minLand ?? 0)) return false;
      if (land > (e.maxLand ?? 999)) return false;
    }

    // Income check
    if (!isNaN(income)) {
      if (income > (e.maxIncome ?? 999999999)) return false;
    }

    // Crop check: if scheme has specific crops, farmer's crop must be in list
    if (crop && e.cropTypes && e.cropTypes.length > 0) {
      if (!e.cropTypes.includes(crop)) return false;
    }

    // Age check
    if (!isNaN(age)) {
      if (age < (e.minAge ?? 18)) return false;
      if (age > (e.maxAge ?? 99)) return false;
    }

    return true;
  });

  renderSchemes(eligible);

  if (eligible.length === 0) {
    showEligibilityResult("error", `❌ No schemes found matching your profile. Try different values.`);
  } else {
    showEligibilityResult("success", `✅ Great news! You may be eligible for <strong>${eligible.length} scheme${eligible.length > 1 ? "s" : ""}</strong>. Results shown below.`);
  }
});

// Reset Button
document.getElementById("resetEligibilityBtn").addEventListener("click", () => {
  document.getElementById("stateInput").value  = "";
  document.getElementById("landInput").value   = "";
  document.getElementById("incomeInput").value = "";
  document.getElementById("cropInput").value   = "";
  document.getElementById("ageInput").value    = "";
  document.getElementById("eligibilityResult").style.display = "none";
  renderSchemes(allSchemes);
});

const showEligibilityResult = (type, message) => {
  const el = document.getElementById("eligibilityResult");
  el.style.display = "block";
  el.className = `eligibility-result result-${type}`;
  el.innerHTML = message;
};

// ═══════════════════════════════════════════
//  DOCUMENT CHECKLIST MODAL
// ═══════════════════════════════════════════
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle   = document.getElementById("modalTitle");
const documentList = document.getElementById("documentList");
let currentSchemeName = "";
let currentDocuments  = [];

const openDocModal = (schemeId, schemeName) => {
  const scheme = allSchemes.find((s) => s._id === schemeId);
  if (!scheme || !scheme.documents || scheme.documents.length === 0) return;

  currentSchemeName = schemeName;
  currentDocuments  = scheme.documents;

  modalTitle.textContent = `📋 Documents for: ${schemeName}`;
  documentList.innerHTML = scheme.documents
    .map((doc, i) => `<li><span class="doc-num">${i + 1}</span>${doc}</li>`)
    .join("");

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ── Print Checklist ──
document.getElementById("printBtn").addEventListener("click", () => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>Document Checklist - ${currentSchemeName}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1f1a14; }
        h1 { color: #1e5c2f; font-size: 1.4rem; margin-bottom: 8px; }
        p  { color: #666; margin-bottom: 24px; font-size: 0.9rem; }
        ol { padding-left: 20px; }
        li { margin-bottom: 12px; font-size: 1rem; line-height: 1.6; }
        .footer { margin-top: 40px; font-size: 0.8rem; color: #999; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>Document Checklist</h1>
      <p>Scheme: <strong>${currentSchemeName}</strong></p>
      <ol>${currentDocuments.map((d) => `<li>${d}</li>`).join("")}</ol>
      <div class="footer">Generated by Smart Farmer System • Collect all documents before applying.</div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
});

// ── Download as Text ──
document.getElementById("downloadBtn").addEventListener("click", () => {
  const content = [
    `DOCUMENT CHECKLIST`,
    `Scheme: ${currentSchemeName}`,
    `Generated by Smart Farmer System`,
    ``,
    ...currentDocuments.map((d, i) => `${i + 1}. ${d}`),
    ``,
    `Collect all documents before visiting the office or applying online.`,
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${currentSchemeName.replace(/\s+/g, "_")}_Documents.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════
const formatCategory = (category) => {
  const map = {
    income_support:  "Income Support & Welfare",
    subsidy_support: "Subsidy & Input Support",
    irrigation_infra:"Irrigation & Infrastructure",
    insurance_risk:  "Insurance & Risk Protection",
    credit_finance:  "Credit & Financial Support",
    training_social: "Training & Social Security",
  };
  return map[category] || category;
};

// Safely escape scheme name for use in onclick attribute
const escapeStr = (str) => str.replace(/'/g, "\\'").replace(/"/g, "&quot;");

// ═══════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════
categoryFilter.addEventListener("change", (e) => {
  // Reset eligibility result when category changes
  document.getElementById("eligibilityResult").style.display = "none";
  fetchSchemes(e.target.value);
});

// 🚀 Initial load
fetchSchemes();

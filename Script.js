// Load previous data or create empty array
let usageData = JSON.parse(localStorage.getItem("usageData")) || [];

const form = document.getElementById("usageForm");
const ctx = document.getElementById("usageChart");
const tipDisplay = document.getElementById("energyTip");

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const electricity = parseFloat(document.getElementById("electricity").value);
  const water = parseFloat(document.getElementById("water").value);
  const gas = parseFloat(document.getElementById("gas").value);

  const today = new Date().toLocaleDateString();

  usageData.push({ date: today, electricity, water, gas });
  localStorage.setItem("usageData", JSON.stringify(usageData));

  form.reset();
  renderChart();
  alert("Data saved successfully!");
});

// Render chart using Chart.js
function renderChart() {
  if (usageData.length === 0) return;

  const labels = usageData.map(item => item.date);
  const electricity = usageData.map(item => item.electricity);
  const water = usageData.map(item => item.water);
  const gas = usageData.map(item => item.gas);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Electricity (kWh)", data: electricity, borderWidth: 2 },
        { label: "Water (Liters)", data: water, borderWidth: 2 },
        { label: "Gas (m³)", data: gas, borderWidth: 2 },
      ],
    },
  });
}

// Load energy tips
fetch("data/tips.json")
  .then((res) => res.json())
  .then((tips) => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipDisplay.textContent = randomTip;
  });

renderChart();

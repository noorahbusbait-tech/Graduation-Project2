
// Dummy data (replace with model output)
const days = ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7",
              "Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14"];

const losData = [5,6,5.5,6.2,6.8,7,6.5,6.7,7.2,7.5,7.1,6.9,7.3,7.6];
const occupancyData = [70,72,75,78,80,82,85,87,88,90,92,91,93,95];


// Example Prediction Outputs
document.getElementById("patientStatus").innerText =
    "Stable (Low Risk of Readmission)";

document.getElementById("occupancyPrediction").innerText =
    "Expected to reach 95% capacity within 2 weeks";

document.getElementById("predOccupancy").innerText = "95%";
document.getElementById("predLOS").innerText = "7.6";
document.getElementById("predRisk").innerText = "12 patients";
document.getElementById("predConfidence").innerText = "89%";

function logout(){
    localStorage.clear();
    window.location="login.php";
}



fetch("outputs/finaloccupancy.json")
  .then(res => res.json())
  .then(data => {

    const box = document.getElementById("occupancyResults");
    const riskBox = document.getElementById("patientPrediction");

    let labels = [];
    let values = [];

    box.innerHTML = "<strong>Next 3 Weeks Bed Occupancy:</strong><br>";

    data.forEach(row => {

      labels.push(row.Date);
      values.push(row.Tuned_Predicted_Occupancy);

      box.innerHTML += `
        ${row.Date} → ${row.Tuned_Predicted_Occupancy.toFixed(2)}<br>
      `;
    });

    // CHART
    new Chart(document.getElementById("occupancyChart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Bed Occupancy",
          data: values,
          borderWidth: 2
        }]
      }
    });

    // -------------------------
    // SIMPLE SHORTAGE LOGIC
    // -------------------------
    const max = Math.max(...values);
    let risk = "Low";

    if (max > 75) risk = "High Risk of Shortage";
    else if (max > 60) risk = "Moderate Risk";

    riskBox.innerHTML = `
      <strong>Shortage Risk:</strong><br>
      ${risk}
    `;
  })
  .catch(err => {
    console.error(err);
  });

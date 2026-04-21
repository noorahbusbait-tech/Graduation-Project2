// load your JSON file
fetch("outputs/finaloccupancy.json")
  .then(response => response.json())
  .then(data => {

    // 🔹 1. Fill results box
    let box = document.getElementById("occupancyResults");

    data.forEach(row => {
      box.innerHTML += `
        <p>${row.Date} → ${row.Tuned_Predicted_Occupancy}</p>
      `;
    });

    // 🔹 2. Prepare chart data
    const labels = data.map(d => d.Date);
    const values = data.map(d => d.Tuned_Predicted_Occupancy);

    // 🔹 3. Draw chart
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

    // 🔹 4. Patient prediction (placeholder)
    document.getElementById("patientPrediction").innerHTML +=
      "<p>Stable (Low Risk)</p>";

  })
  .catch(err => {
    console.error(err);
    document.getElementById("forecastStatus").innerText =
      "Model Status: Error loading data";
  });

// const searchButton = document.querySelector("#search-button");
// const resultsTable = document.querySelector("#results tbody");

// searchButton.addEventListener("click", function() {
//   // Get the tracking ID from the input field.
//   const trackingId = document.querySelector("input[name='tracking_id']").value;

//   // Make an API request to fetch the shipment tracking details.
//   // ...

//   // Display the results in the table.
//   // ...
// });
const predefinedTrackingData = [
  {
    trackingId: "1234567890",
    currentLocation: "Kunda,Uttarpradesh ",
    status: "In Transit",
    expectedDeliveryDate: "2023-11-25"
  },
  {
    trackingId: "0987654321",
    currentLocation: "Prayagraj,Uttarpradesh ",
    status: "Out for Delivery",
    expectedDeliveryDate: "2023-11-22"
  },
  {
    trackingId: "0987654322",
    currentLocation: "Item yet to Pickup ",
    status: "In Transit",
    expectedDeliveryDate: "2023-11-26"
  },
  {
    trackingId: "0987654323",
    currentLocation: "Lucknow,Uttarpradesh ",
    status: "Deliverd",
    expectedDeliveryDate: "2023-11-20"
  }
];

const searchButton = document.querySelector("#search-button");
const resultsTable = document.querySelector("#results tbody");

searchButton.addEventListener("click", function() {
  // Get the tracking ID from the input field.
  const trackingId = document.querySelector("input[name='tracking_id']").value;

  // Check if the tracking ID is predefined.
  let trackingInfo;
  for (const trackingData of predefinedTrackingData) {
    if (trackingData.trackingId === trackingId) {
      trackingInfo = trackingData;
      break;
    }
  }

  // If the tracking ID is predefined, display the predefined information.
  if (trackingInfo) {
    const row = resultsTable.insertRow();
    row.innerHTML = `
      <td>${trackingInfo.trackingId}</td>
      <td>${trackingInfo.currentLocation}</td>
      <td>${trackingInfo.status}</td>
      <td>${trackingInfo.expectedDeliveryDate}</td>
    `;
  } else {
    // If the tracking ID is not predefined, make an API request to fetch the shipment tracking details.
    // ...
  }
});

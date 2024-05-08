const searchButton = document.querySelector("#search-button");
const resultsTable = document.querySelector("#results tbody");

searchButton.addEventListener("click", function() {
  // Get the source and destination postal codes from the input fields.
  const sourcePostalCode = document.querySelector("input[name='source_postal_code']").value;
  const destinationPostalCode = document.querySelector("input[name='destination_postal_code']").value;

  // Make an API request to fetch the book track history.
  // ...

  // Display the results in the table.
  // ...
});

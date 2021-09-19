// Call the data into the inspector console and give
// it names so it is easier to determine what we are looking at.
let data = d3.json("samples.json").then(function (data) {
  console.log("samples.json:", data);
  console.log("Test Subject IDs:", data.names);
  console.log("Test Subject Metadata:", data.metadata);
  console.log("Test Subject Sample Data:", data.samples);

  // Set up the DropDown:
  let DropDown = d3.select(`#selDataset`);

  data.names.forEach((name) => {
    DropDown.append(`option`).text(name).property(`value`, name);
  });
});

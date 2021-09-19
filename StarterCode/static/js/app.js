// Initialize the page with a default plot (data for 940)
function charts(name) {
  d3.json("samples.json").then((data) => {
    var subject = data.samples; //.map(function (row) {
    // return row.sample_values.slice(0, 10);
    // return row.otu_ids.slice(0, 10);
    var resultsarray = subject.filter((sampleobject) => sampleobject.id == id);
    var result = resultsarray[0];
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    // console.log("This is what you are looking for:", samples);
    // let demoPanel = d3.select("#sample-metadata");
    // demoPanel.html("");
    // let filteredData = samples.filter(
    //   (sampleName) => sampleName.sample_values == sample_values
    // )[0];
    // Object.entries(filteredData).forEach(([key, value]) => {
    //   demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    // });

    let trace1 = [
      {
        x: ids
          .slice(0, 10)
          .map((otuID) => `OTU ${otuID}`)
          .reverse(),
        y: values.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];
    // Data trace array
    let traceData = [trace1];

    // Apply the group barmode to the layout
    let layout = {
      title: "Belly Button BioDiversity",
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);
  });
}

/** This part calls the data into the console and it appears to work. Stop messing with it.
 */
// Call the data into the inspector console and give
// it names so it is easier to determine what we are looking at.
function init() {
  d3.json("samples.json").then(function (data) {
    console.log("samples.json:", data);
    console.log("Test Subject IDs:", data.names);
    console.log("Test Subject Metadata:", data.metadata);
    console.log("Test Subject Sample Data:", data.samples);

    // Set up the DropDown:
    let DropDown = d3.select(`#selDataset`);

    data.names.forEach((name) => {
      DropDown.append(`option`).text(name).property(`value`, name);
    });

    const firstSample = data.names[0];
    charts(firstSample);
  });
}

function change(newSample) {
  charts(newSample);
}

init();

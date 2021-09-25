// Initialize the page with a default plot (data for 940)
function charts(selectedPatientID) {
  d3.json("samples.json").then((data) => {
    var plottingData = data.samples;
    var subject = plottingData.filter(
      (sampleobject) => sampleobject.id == selectedPatientID
    )[0];

    console.log(subject);
    var ids = subject.otu_ids;
    var labels = subject.otu_labels;
    var values = subject.sample_values;

    // Horizontal Bar Char
    var trace1 = {
      x: values.slice(0, 10).reverse(),
      y: ids
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse(),
      text: labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [trace1];

    var layout = {
      title: "Top 10 Cultures Found",
      xaxis: { autorange: true },
      yaxis: { autorange: true },
      margin: { t: 70, l: 100 },
      height: 380,
    };

    Plotly.newPlot("bar", data, layout);

    // Bubble Chart
    var trace1 = {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        colorscale: "Electric",
      },
    };

    var data = [trace1];

    var layout = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      width: window.width,
    };

    Plotly.newPlot("bubble", data, layout);
  });
}

// Demographic Info
function demo(selectedPatientID) {
  d3.json("samples.json").then((data) => {
    var MetaData = data.metadata;
    var subject = MetaData.filter(
      (sampleobject) => sampleobject.id == selectedPatientID
    )[0];
    var demographicInfoBox = d3.select("#sample-metadata");
    demographicInfoBox.html("");
    Object.entries(subject).forEach(([key, value]) => {
      demographicInfoBox.append("h5").text(`${key}: ${value}`);
    });

    // Gauge
    var guageData = [
      {
        domain: { x: [0, 5], y: [0, 1] },
        value: subject.wfreq,
        text: subject.wfreq,
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 10 },
        gauge: { axis: { range: [null, 9] } },
      },
    ];

    var layout = {
      title: "<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week</br>",
      width: 350,
      height: 350,
      margin: { t: 50, r: 25, l: 25, b: 25 },
    };
    Plotly.newPlot("gauge", guageData, layout);
  });
}

// Call the data into the inspector console
function init() {
  d3.json("samples.json").then(function (data) {
    console.log("samples.json:", data);
    // Set up the DropDown:
    let DropDown = d3.select(`#selDataset`);

    data.names.forEach((name) => {
      DropDown.append(`option`).text(name).property(`value`, name);
    });

    const firstSample = data.names[0];
    charts(firstSample);
    demo(firstSample);
  });
}

function optionChanged(newSample) {
  charts(newSample);
  demo(newSample);
}

init();

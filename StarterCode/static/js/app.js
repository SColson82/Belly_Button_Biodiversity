// Call the data into the inspector console. 
d3.json("samples.json").then(function (data) {
    console.log(data);
});

// Gather the top 10 OTUs:
// Sort the data descending
let sampleValues = data.sort((a, b) => b.sample_values - a.sample_values);
let slicedSampleValues=sampleValues.slice(0,10);
console.log(slicedSampleValues);

// Create horizontal bar chart with dropdown menu for each OTU

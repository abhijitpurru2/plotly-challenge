// Creates the dropdown menu
function dropdownCreator() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json('samples.json').then((sampleData) => {
        var dataNames = sampleData.names;
        dataNames.forEach((info) => {
            dropdownMenu.append("option")
                .text(info)
                .property("value", info)
        });
        // Creates charts and metadata with starting values
        metadataVisual(dataNames[0]);
        chartsVisual(dataNames[0]);
    });
}

// Changes the data set when sample is changed
function optionChanged(sampleNo) {
    metadataVisual(sampleNo);
    chartsVisual(sampleNo);
}

// Creates the bar chart
function chartsVisual(sampleNo){
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var info = samples.filter(sampleObject => sampleObject.id == sampleNo);

        var otu_ids = info[0].otu_ids;
        var otu_labels = info[0].otu_labels;
        var sample_values = info[0].sample_values;

        var barChart = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        Plotly.newPlot('bar', barChart);
    });
}

// Creates the metadata
function metadataVisual(sampleNo){
    d3.json("samples.json").then((data) => {
        var metadataD3 = d3.select("#sample-metadata");
        metadataD3.html("");
        var metadataInfo = data.metadata;
        var info = metadataInfo.filter(sampleObject => sampleObject.id == sampleNo);
        Object.entries(info[0]).forEach(([key, value]) => {
            metadataD3.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Starts the program
dropdownCreator();

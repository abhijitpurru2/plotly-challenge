function dropdownCreator() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json('samples.json').then((sampleData) => {
        var dataNames = sampleData.names;
        dataNames.forEach((info) => {
            dropdownMenu.append("option")
                .text(info)
                .property("value", info)
        });
        metadataVisual(dataNames[0]);
        chartsVisual(dataNames[0]);
    });
}

function optionChanged(sampleNo) {
    metadataVisual(sampleNo);
    chartsVisual(sampleNo);
}

function chartsVisual(sampleNo){
    d3.json("sample.json").then((data) => {
        var samples = data.samples;
        var info = samples.filter(sampleObject => sampleObject.id == sampleNo);

        var otu_ids = info.otu_ids;
        var otu_labels = info.otu_labels;
        var sample_values = info.sample_values;

        var barChart = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            color: 'blue'
        }];

        Plotly.newPlot("bar", barChart);
    });
}

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

dropdownCreator();

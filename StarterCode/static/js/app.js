
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
    });
}

function metadataVisual(sampleNo){
    d3.json("samples.json").then((data2) => {
        var metadataD3 = d3.select("#sample-metadata");
        metadataD3.html("");
        var metadataInfo = data2.metadata;
        var info = metadataInfo.filter(sampleObject => sampleObject.id == sampleNo);
        Object.entries(info[0]).forEach(([key, value]) => {
            metadataD3.append("h6").text(`${key}: ${value}`);
        });
    });
}

function chart(sampleNo){

}

dropdownCreator();










function dropdownCreator() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json('samples.json').then((sampleData) => {
        var dataNames = sampleData.names;
        dataNames.forEach((info) => {

        })
    });
}









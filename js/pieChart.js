/*
************************************
DONUT CHART TEMPLATE
v1.1
Uses nvd3 and d3 libraries
Samuel Laroche - IITB
29/01/2018
************************************
*/﻿
nv.addGraph(function () {
    var chart = nv.models.pieChart()
        .x(function (d) { return d.label })
        .y(function (d) { return d.value })
        .color(mycolor())    //Enable custom colors
        .legendPosition("right") //Sets legend at the right instead of on top
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
    ;

    d3.select("#chart")
        .append("svg")
        .datum(DATA)
        .transition().duration(350)
        .call(chart);

    return chart;
});

//Set theme colors
var mycolor = function(){
    var mycolor = [
            "#ECDB54", //yellow
            '#e94b3c', //red
            "#6f9fd8", //blue
            '#944743', //Brown
            "#00a591", //turquoise
            '#6b5b95', //purple
            "#bfd641", //lime
            '#bc70a4' //ligth pink
    ];
  return color;
}

/*
************************************
Line CHART TEMPLATE
v1.0
Uses nvd3 and d3 libraries
Samuel Laroche - IITB
19/01/2018
************************************
*/﻿
var chart;
var data;
var legendPosition = "top";

var toggleLegend = function () {
    if (legendPosition == "top") {
        legendPosition = "bottom";
    } else {
        legendPosition = "top";
    }
    chart.legendPosition(legendPosition);
    chart.update();
};
nv.addGraph(function () {
    chart = nv.models.lineChart()
        .options({
            duration: 300,
            useInteractiveGuideline: true
        });
    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
        .axisLabel("Period")
        .tickFormat(d3.format('1f'))
        //.staggerLabels(true) //to remove overlaps
    ;
    chart.yAxis
        .axisLabel('$')
        .tickFormat(function (d) {
            if (d == null) {
                return 'N/A';
            }
            return d3.format('$1f')(d);
        })
    ;
    data = mydata();

    d3.select('#chart')
        .append('h2')
        .text(myTitle())

    d3.select('#chart')
        .append('svg')
        .datum(data)
        .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
});

function mydata() {
    var item = DATA["items"][0]
    return serializeValues(item["jsObject"]);
}

function myTitle() {
    var title = DATA["items"][0]["desc"]
    return title
}

var scalePeriod = function (dataArray) {
    //Adds y=0 for x:periods missing from domain to fill axis
    for (i = 0; i < dataArray.length; i++) {

        if (dataArray[i].x != i + 1) {
            //insert x:Period y:0 at position i
            dataArray.splice(i, 0, { x: i + 1, y: 0 });
        }
    }
    while (dataArray.length < 12) {
        dataArray.push({ x: dataArray.length + 1, y: 0 })
    }

    return dataArray;
}

var serializeValues = function (plotArray) {

    var data = new Array

    for (j = 0; j < plotArray.length; j++) {

        var points = plotArray[j]["values"]

        for (i = 0; i < points.length; i++) {
            var point = {
                x: points[i]["x"],
                y: points[i]["y"]
            }
            points[i] = point

        }

        data.push(
          {
              key: plotArray[j]["key"],
              color: plotArray[j]["color"],
              fillOpacity: .1,
              area: true,
              values: scalePeriod(points)
          })
    }

    return data
}

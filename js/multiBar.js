//Set theme colors here
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
/*
Keeping those for later
var mycolor = [
        "#b1d000", //Green
        '#2eafde', //Light blue
        "#3b4652", //Dark gray
        "#d22239", //Red
        '#003f7e', //Dark blue
        "#ff5722", //Orange
        "#cc0099" //Purple
];*/

function setStyle() {

    var bkdcolor;

    for (i = 0; i < DATA["datasets"].length; i++) {

      switch (DATA['datasets'][i]['label']) { // Predefined label colors should be added here
        case 'Analyse':
          bkdcolor = "#ECDB54" //yellow
          break;
        case 'Build':
          bkdcolor = '#e94b3c' //red
          break;
        case 'Design':
          bkdcolor = "#6f9fd8" //blue
          break;
        case 'Deploy':
          bkdcolor = '#944743' //Brown
          break;
        case 'Plan':
          bkdcolor = "#00a591" //turquoise
          break;
        case 'Project Management':
          bkdcolor = '#6b5b95' //purple
          break;
        case 'Test':
          bkdcolor = "#bfd641" //lime
          break;
        default:
        bkdcolor = mycolor[i];
      }
        DATA["datasets"][i]['backgroundColor'] = bkdcolor;
        DATA["datasets"][i]['borderWidth'] = 1;
        DATA["datasets"][i]['borderColor'] = 'white';
    }
    //Last modified 09/03/2018
}
setStyle();

var ctx = document.getElementById("chart");
var stackedBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: DATA['labels'],
        datasets: DATA['datasets']
    },
    options: {
        scales: { //Enables Stacked bars
            xAxes: [{
                distribution: 'series',
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function (value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        },
        title: {
            display: true,
            text: DATA['desc'],
            fontSize: 25
        }
    }
})

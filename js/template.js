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

function setStyle(json) {

    var bkdcolor;

    for (i = 0; i < json['datasets'].length; i++) {

      switch (json['datasets'][i]['label']) { // Predefined label colors should be added here
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
        console.log("use that color:" + mycolor[i]);
      }
        json["datasets"][i]['backgroundColor'] = bkdcolor;
        json["datasets"][i]['borderWidth'] = 1;
        json["datasets"][i]['borderColor'] = 'white';
    }
    return json;
    //Tested
}

var loadChart = function(data, report){

  if (data['datasets'] !== undefined){
    var json = setStyle(data);
    var ctx = document.getElementById("chart");
    var stackedBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: json['labels'],
            datasets: json['datasets']
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
                text: json['title'],
                fontSize: 25
            }
        }
    })
  } else {
    $('#chartcontainer').append('No data available');
  }
}

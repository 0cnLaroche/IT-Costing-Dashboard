var getTable = function(data){

  if (data){
    var html;
    var total = 0;
    items = [];

    items.push("<table><tr>");

    for (var i = 0; i < data.length; i++){
      items.push('<th>' + data[i].Category + '</th>');
    }
    items.push('<th>Total</th></tr>');
    for(var i = 0; i < data.length; i++){
      let formatted = new Intl.NumberFormat('en-CA').format(parseInt(data[i].Amount));
      items.push('<td>' + '$ ' + formatted + '</td>');
      total += parseInt(data[i].Amount);
    }
    let formatted = new Intl.NumberFormat('en-CA').format(parseInt(total));
    items.push('<td>' + '$ ' + formatted + '</td></tr></table');

    html = items.join("");
    $('#tab').append(html);

  } else {
    $('#tab').append('no data available');
  }
}

var json;
var html;

$.getJSON('I-0077.json', function(data) {

var total = 0;

json = data;

items = [];
items.push("<table><tr>");

$.each(data, function(key,val) {
  items.push('<th>' + key + '</th>');
})
items.push('<th>Total</th></tr>');

$.each(data, function(key,val) {
  items.push('<td>' + '$ ' + parseInt(val).toLocaleString('currency') + '</td>');
  total += parseInt(val);
})
items.push('<td>' + '$ ' + total.toLocaleString('currency') + '</td></tr></table');

html = items.join("");
$('#tab').append(html);

});

var mysql = require('mysql');
var express = require('express');
var fs = require('fs');
var querystring = require('querystring');
var router = express.Router();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'webadmin',
  password: 'Pa$$w0rd',
  database: 'costing'
});

connection.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected Solution Router to database as Id ' + connection.threadId);
});

router.get('/', function (req, res){

  fs.readFile("./solution/solution.html", 'utf8', function(err,content){
        res.send(content);
    })
})

router.get('/chart', function (req, res){
  var id = req.query.id;
  var report = '' + req.query.report
  var chartjson;
  if (id && report) { //Return chart if both fields are filled, otherwise return menu
      api = '/solution/api?id=' + id  + '&report=' + report;
      getdata(id, report, function(err, data){
        if (err){
          console.err(err.stack);
        } else {
          chartjson = barchart(data);
          getdata(id, 'table', function(err, tablejson){
            if(err){
              console.error(err.stack);
            } else {
              res.render('chart', {
                script: 'loadChart(' + JSON.stringify(chartjson) + ');\n getTable(' + JSON.stringify(tablejson) + ');'
              })
            }
          })
        }
      })
  }
})

router.get('/api', function (req, res){
  var parsedQ = querystring.parse(req.query)
  var id = req.query.id;
  var report = '' + req.query.report; //Tested
  if (id || report) { //Return chart if both fields are filled, otherwise return menu
    getdata(id, report, function(err, data){
      if (err){
        console.error(err.stack);
      } else {
        res.json(data);
      }
    });
  } else {
    //TODO: Implement missing parameters
  }
})

router.get('/index', function(req, res){
  connection.query('SELECT ID, Name FROM Solution ORDER BY Name', function(err,results,fields){
    res.json(results);
  })
})

var getdata = function(id, report, callback){
    var query;
    switch(report){
      case 'yearly':
        query = 'solutionYearly';
        break;
      case 'table':
        query = 'solutionSummary';
        break;
      case 'period':
        query = 'solutionPeriod';
        break;
    }
    fs.readFile('sql/' + query + '.sql', 'utf8', function(err, content){
      if (err){
        console.error(err.stack);
      } else {
        connection.query(content, [id], function(err, results, fields) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results)
          }
        })
      }
    })
} //Tested 26/03/2018

var barchart = function(data){
  /*JSON format for Chartjs
  * {"title":"", "labels": [domain], "datasets":[
  *   {"label":"category1", "data": [image]},
  *    ... ]}
  */
  //1- Établir domaine et variables

  var domain = [2015,2016,2017,2018,2019];
  var json = {};
  var set = {};
  var y = [];

  //2- Ajouter le titre et le domaine
  if(data[0]){

  json['title'] = data[0]['Name'];
  json['labels'] = domain;
  json['datasets'] = [];

  for (var i = 0; i < data.length; i++){

    if (data[i].Label != set.label) { //On a trouvé une nouvelle categorie donc on ajoute le nom
      if (set['label']){ // Pour s'assurer qu'on ajoute pas un set vide
        set['data'] = y; // On ajoute l'image
        json['datasets'].push(set); // Il faut ajouter le set au datasets du json si déjà initialisé
      }
      set = {}; //On initialise un nouveau set (categorie)
      y = [];
      set['label'] = data[i].Label

      for (var j = 0; j < domain.length; j++){ //On réinitialise l'image à zéro
        y.push(0);
      }
    }
    for (var k = 0; k < domain.length; k++){ // On ajoute le montant à la position des Y correspondant au X
      if (data[i].Period == domain[k]){
        y[k] = data[i].Amount;
      }
    }
  }
  if (set['label']){ // Pour s'assurer qu'on ajoute pas un set vide
    set['data'] = y; // On ajoute l'image
    json['datasets'].push(set); // Il faut ajouter le set au datasets du json si déjà initialisé
  }
  }
  return json
}

/*connection.end(function(err){
  console.log('connection ' + connection.threadId + ' closed');
});*/

module.exports = router

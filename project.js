var mysql = require('mysql');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var connection = mysql.createConnection({
  host: '10.54.223.154',
  user: 'webadmin',
  password: 'Pa$$w0rd',
  database: 'costing'
});

connection.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected project Router to database as Id ' + connection.threadId);
});

router.get('/', function (req, res){

  fs.readFile("./project/project.html", 'utf8', function(err,content){
        res.send(content);
    })
})

router.get('/chart', function (req, res){
  var options;
  var fy = req.query.fiscalyear
  var id = new String(req.query.id);
  var report = new String(req.query.report);
  var chartjson, clientscript;

  switch(report){
    case 'yearly':
      break;
    case 'period':
      options.report = 'period';
      options.query.name = 'projectPeriod';
      options.domain = 'period';
      options.query.param = [fy];
      options.summary = true;
      break;
    case 'table':
      options.report = 'table';
      options.query.name = 'projectSummary';
      //options.domain = '';
      //options.query.param = [];
      break;
  }

  if (options) { //Return chart if both fields are filled, otherwise return menu
      //api = '/solution/api?id=' + id  + '&report=' + report;
      getdata(id, options, function(err, data){
        if (err){
          console.err(err.stack);
        } else {
          chartjson = JSON.stringify(barchart(data));
          clientscript = 'loadChart(' + chartjson + ');'

          if (options.summary == true){ //Dans le cas ou le rapport est period, on veut aussi voir une table sommaire en bas
            getdata(id, {report:'table', query:{name: 'projectSummary'}}, function(err, data){
              if(err){
                console.error(err.stack);
              } else {
                  clientscript += '\n getTable(' + JSON.stringify(data) + ');'
              }
            })
          }
          res.render('chart', {script: clientscript}); //Transmet le template HTML avec les scripts du client
        }
      })
    }
})

router.get('/index', function(req, res){

  connection.query('SELECT ID, Name FROM ProjectDefinition ORDER BY Name', function(err,results,fields){

    res.json(results);
  })
})

var getdata = function(id, options, callback){
  var query = options.query.name;
  var param = options.query.param;

    fs.readFile('sql/' + query + '.sql', 'utf8', function(err, content){
      if (err){
        console.error(err.stack);
      } else {
        connection.query(content, param, function(err, results, fields) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results)
          }
        })
      }
    })
}

var barchart = function(data, options){
  /*JSON format for Chartjs
  * {"title":"", "labels": [domain], "datasets":[
  *   {"label":"category1", "data": [image]},
  *    ... ]}
  */
  //++++++++++++++++++++++++++++++++++++++
  //LEs options viennent du routeur
  //1- Établir domaine et variables

  var domain = [];
  var json = {};
  var set = {};
  var y = [];

  if (options.domain == 'yearly') { //On établie le domaine
    domain = [2015,2016,2017,2018,2019];
  } else {
    domain = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  }

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

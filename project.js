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

  var fy = req.query.fiscalyear
  var id = req.query.id;

  if (fy || id) { //Return chart if both fields are filled, otherwise return menu

    fs.readFile('res/Project' + id + '-' + fy + '.html', 'utf8', function(err,content){
      if (err){
        res.send('Not found');
      } else  {
        res.send(content);
      }
    })

  } else {
      //TODO: Implement missing query parameters
      }
})

router.get('/index', function(req, res){

  connection.query('SELECT ID, Name FROM ProjectDefinition ORDER BY Name', function(err,results,fields){

    res.json(results);
  })
})

/*connection.end(function(err){
  console.log('connection ' + connection.threadId + ' closed');
});*/

module.exports = router

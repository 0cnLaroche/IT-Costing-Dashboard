var mysql = require('mysql');
var express = require('express');
var fs = require('fs');
var querystring = require('querystring');
var router = express.Router();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'iitbchart',
  password: 'P@$$w0rd',
  database: 'costing'
});

connection.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected Solution Router to database as Id ' + connection.threadId);
});


router.get('/run', function(req, res){
  connection.query('SELECT ID, Name FROM RUN ORDER BY ID WHERE ClosingDate IS NULL;', function(err,results,fields){
    res.json(results);
  })
})

router.get('/project', function(req, res){
  connection.query('SELECT ID, Name FROM Network ORDER BY ID WHERE ClosingDate IS NULL;', function(err,results,fields){
    res.json(results);
  })
})

router.get('/costcenter', function(req, res){
  connection.query('SELECT ID, Name, Manager FROM CostCenter ORDER BY ID WHERE ClosingDate IS NULL;', function(err,results,fields){
    res.json(results);
  })
})

/*connection.end(function(err){
  console.log('connection ' + connection.threadId + ' closed');
});*/

module.exports = router

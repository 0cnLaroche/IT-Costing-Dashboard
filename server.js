var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const $PORT = process.env.port || 8080;

app.get('/', function(req,res){

    fs.readFile('index.html', 'utf8', function(err,content){
        res.send(content);
    })
})

//Here are handled solution request
app.get('/solution', function(req, res){
    var id = req.query.id;

    if (id) { //Detect if id is filled, return chart otherwise send menu

      fs.readFile('res/solutionYearly' + id + '.html', 'utf8', function(err,content){
        if (err){
          res.send('Not found');
        } else  {
          res.send(content);
        }
      })

    } else {

      fs.readFile("solution.html", 'utf8', function(err,content){
          res.send(content);
      })
    }
})

//Here are handled projects requests
app.get('/project', function(req, res){

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
        fs.readFile("projet.html", 'utf8', function(err,content){
          res.send(content);
        })
      }
})

app.listen($PORT, function(){
    console.log('Server listening on port ' + $PORT);
})

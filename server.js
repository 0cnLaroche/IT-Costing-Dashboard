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
    
    fs.readFile('menu.html', 'utf8', function(err,content){
        res.send(content);
    })
})

app.get('/solution', function(req, res){
    var id = req.query.id;
    
    fs.readFile('res/solutionYearly' + id + '.html', 'utf8', function(err,content){
        
    if (err){
        res.send('Not found');
    } else  {
        res.send(content);
    }
    })
})

app.listen($PORT, function(){
    console.log('Server listening on port ' + $PORT);
})


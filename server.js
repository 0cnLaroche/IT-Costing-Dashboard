var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var project = require('./project');
var solution = require('./solution');
var api = require('./api');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const $PORT = process.env.port || 8080;

//To use static assets directories
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('images'));

app.use(express.static('json')); // To remove once mySQL is setup
app.use(express.static('res'));

//Template engine
app.engine('html', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
    var rendered = content.toString()
    .replace('#report#', options.report)
    .replace('#message#', options.message)
    .replace('#script#', options.script)
    return callback(null, rendered)
  })
})

app.set('views', './views') // specify the views directory
app.set('view engine', 'html') // register the template engine

app.get('/', function(req,res){

    fs.readFile('index.html', 'utf8', function(err,content){
        res.send(content);
    })
})

app.use('/project', project);
app.use('/solution', solution);
app.use('/api', api);

app.listen($PORT, function(){
    console.log('Server listening on port ' + $PORT);
})

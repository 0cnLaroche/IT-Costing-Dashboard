var fs = require('fs');

fs.readFile('res/solutionYearly699.html', 'utf8', function(err,content){
    console.log(content);
})
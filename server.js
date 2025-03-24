var express=require('express');
var app=express();
console.log('server started');
//Load css file in /public folder
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	res.render('index.ejs');

});

app.listen(3000);

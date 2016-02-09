var express = require('express');
var bodyParser = require("body-parser");
var app     = express();

var leBonCoin = require('./leBonCoin.js');
var meilleursAgents = require('./meilleursAgents.js');


app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/server', function(req, res){
	res.sendFile( __dirname  + '/main.html');
});

app.get('/result', function(req, res){
	
	var url = req.param("ad-lbc"); 
				
	//scrape Leboncoin et meilleurs Agents
	leBonCoin.getDataLBC(url, res, meilleursAgents.getDataMA);	
});


app.listen('8082')
console.log('the server is started');

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = require('./leBonCoinSchema.json');

function getData(req, res)
{
	url = 'http://www.leboncoin.fr/ventes_immobilieres/888865422.htm?ca=12_s';
	
	request(url, function(error, response, html)
	{
		if(!error)
		{
			var $ = cheerio.load(html);

			var price, city, zip_code , Area , rooms , property_type ;
		
			price =  $("[itemprop='price']").text();
			city =   $("[itemprop='addressLocality']").text();
			zip_code = $("[itemprop='postalCode']").text();
			var datas = $("[class = 'lbcParams criterias']>table > tr > td");
		
			property_type = datas[0].children[0].data;
			rooms = datas[1].children[0].data;
			Area = datas[2].children[0].data;
			
			price = price.match(/[0-9,]/g).join("");
			Area = Area.match(/[0-9,]/g).join("");
			 
			json.properties.price = price;
			json.properties.city = city;
			json.properties.Area = Area;
			json.properties.zip_code = zip_code;
			json.properties.rooms = rooms;
			json.properties.property_type = property_type;   
		}

		fs.writeFile('outputLBC.json', JSON.stringify(json, null, 4), function(err)
		{
			console.log('Writing went good ! Check outputLBC.json in your folder');
		});

		// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
		res.send('Check your console!');

	} );
}

app.get('/scrapeLBC', getData ) ;

app.listen('8081')
console.log('Ready on port 8081');
//exports = module.exports = app;
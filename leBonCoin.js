var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = require('./leboncoinSchema.json');

function getDataLBC(url, page, callbackb)
{	
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
			
			callbackb(json, page);			
		}

		
	} );
	
	
}


exports.getDataLBC = getDataLBC;

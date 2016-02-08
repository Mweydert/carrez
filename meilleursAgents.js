var fs = require('fs');
var cheerio = require('cheerio');
var json = require('./meilleursAgentsSchema.json');

function getDataMA(jsonLBC, res)
{
	
	var file = fs.readFileSync('./meilleursAgentsExample.html', 'utf8');
	var $ = cheerio.load(file);

	var pr = $('.small-4.medium-2.columns.prices-summary__cell--median');

	//get each data
	var average_flat_price = pr[0].children[0].data;
	var average_house_price = pr[1].children[0].data;
	var average_rent_price = pr[2].children[0].data;

	//Keep only numbers
	average_flat_price = average_flat_price.match(/[0-9,]/g).join("").replace(",", ".");
	average_house_price = average_house_price.match(/[0-9,]/g).join("").replace(",", ".");
	average_rent_price = average_rent_price.match(/[0-9,]/g).join("").replace(",", ".");

	//insering in Json file
	json.properties.average_flat_price = average_flat_price;
	json.properties.average_house_price = average_house_price;
	json.properties.average_rent_price = average_rent_price;

	//Compare LebonCoin & MeilleursAgents
	var priceMeter = jsonLBC.properties.price/jsonLBC.properties.Area;
	var type = jsonLBC.properties.property_type;
	var priceMA;
	
	switch(type)
	{
		case "Appartement":
			priceMA = json.properties.average_flat_price;
		break;
		
		case "Maison":
			priceMA = json.properties.average_house_price;
		break;
		
		//location pas fait -> soulève un pb : les locations sont quand meme des appartements ou maison dans type 	
	}

	if(priceMeter > priceMA)
	{
		json.properties.good_deal = false;		
	}
	else
	{
		json.properties.good_deal = true;
	}
	
	//console.log(json);
	
	
	if(json.properties.good_deal == true)
	{		
		//res.sendFile( __dirname  + '\\goodDeal.html');
		
		console.log("GOOD DEAL !");
	}
	else
	{
		//res.sendFile( __dirname  + '\\badDeal.html');	
		console.log("BAD DEAL !");

	}
}

exports.getDataMA = getDataMA;


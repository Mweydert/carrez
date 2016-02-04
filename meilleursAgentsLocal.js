var fs = require('fs');
var cheerio = require('cheerio');
var json = require('./meilleursAgentsSchema.json');
var jsonLBC = require('./outputLBC.json');

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


console.log("price/m LeBonCoin : " + priceMeter);
console.log("price/m MeilleursAgents : " + priceMA);

if(priceMeter > priceMA)
{
	json.properties.good_deal = false;
	console.log("BAD DEAL ! ");
	
}
else
{
	json.properties.good_deal = true;
	console.log("GOOD DEAL ! ");
	console.log(json.properties.good_deal);
}

fs.writeFile('outputMA.json', JSON.stringify(json, null, 4), function(err)
	{
			console.log('Writing went good ! Check outputMA.json in your folder');
	});

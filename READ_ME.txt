To use the application please follow this steps :
- open a command prompt
- install all the packages with "npm install"
- execute the command "node main.js" in the command prompt to launch the server
- open a browser to the address "http://localhost/8082/server"
- Enter the address of a leboncoin's ad and then click on compute
- See the result in the command prompt


The application contains the following issues :
- I didn't achieve to scrape directly from meilleursagents.com due to the necessity to be connected in order to do severals request.
	To avoid this problem I download an example of meilleursagents.com page (Courbevoie), so that all leboncoin's ad are compared to the average price in Courbevoie.
- The html page that shows the result of the comparaison don't display anything.
	This is due to the fact that the html file doesn't achieve to find the picture's resource. 
	I think that the program search for the resource on the server rather than in the local folder.
	In order to print a result, the program tell the user if it's a good deal or not in the command prompt.

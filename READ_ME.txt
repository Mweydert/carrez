To use the application please follow this steps :
- open a command prompt
- install all the packages with "npm install"
- execute the command "node main.js" in the command prompt to launch the server
- open a browser to the address "http://localhost/8082/server"
- Enter the address of a leboncoin's ad and then click on compute
- See the result

To do another comparasion get back to "http://localhost/8082/server" and put a new leboncoin's ad


The application contains the following issues :
- I didn't achieve to scrape directly from meilleursagents.com due to the necessity to be connected in order to do severals request.
	To avoid this problem I download an example of meilleursagents.com page (Courbevoie), so that all leboncoin's ad are compared to the average price in Courbevoie.
- I don't know why but the server sometimes doesn't respond. Try again and it will works (maximum 3 "node main.js" to make it works
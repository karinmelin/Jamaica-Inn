/* 
Script to load drinks into slots of the 'All beverages' page.
Update the drinks form the locally stored list every time the page is loaded.

Author: Karin Melin 2016
*/

/* check if page loaded, then continuing to the function called from page */
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/* when page loaded go through to the next function */
function bevPageLoaded() {
	checkLang();
	connectAPI();
}

/* connects to the server and fetching the info needed for the beverages */
function connectAPI() {
    document.getElementById("clear_button").addEventListener("click", clearCart);
    
    /* create the connection object to the API */
	var api = new APIConnect();
    
    /* fetching the logged in user and setting 
    the username and password for building the
    url used to connect to the API */
	var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
    
    /* from the API, fetching the name and assets
    for the user for display in header */
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
    });
    
    loadDrinks(api);
}

/* function that loads the drinks into the slots of the 'All beverages' */
function loadDrinks(api) {
    
    /* fetching the drinks from the local storage */
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    
    /* loops through the drink list and add each drink to each slot */
    for (var i = 0; i < 20; i++) {
        var drink_name = data[i].namn + ' ' + data[i].namn2;
        
        var n = i+1;
        var drink_td = 'drink' + n + 'p';
        document.querySelector('#' + drink_td).innerHTML = drink_name;
            
        /* fetching the id of the drink being added */
        var drink_id = data[i].beer_id;
            
        /* check with id against the API if non-alcoholic drink
        and adding a label if so */
        checkAlcohol(api, drink_id, n);
            
        /* adding price and units for each beverage for display
        in each slot */
        var amount = data[i].count;
        var price = data[i].price;
        
        //console.log(data[i].count);
        
        if (amount < 0) {
            document.querySelector('#amount' + n).innerHTML = 'Refill me';
        } /*else if (amount > 10){
            document.querySelector('#amount' + n).innerHTML = 10 + ' units';
        } */else {
            document.querySelector('#amount' + n).innerHTML = amount + ' units';
        }
        
        document.querySelector('#price' + n).innerHTML = price + ':-';      
    }
}

/* function called from loadDrinks();
Check if the drink is non-alcholic and
adding a label if so */
function checkAlcohol(api, beer_id, n) {
    
    api.fetchBevType(function(bev){   

    var json = JSON.parse(bev);
    var payload_type = json.payload;
    var beer_type = payload_type[0].varugrupp;
            
    if (beer_type === 'Alkoholfritt, Övrigt'|| beer_type === 'Alkoholfritt, Öl' || beer_type === 'Alkoholfritt, Must') {
        var node = document.querySelector('#drinktype' + n).innerHTML = 'non-alcoholic';
        }
                
    }, beer_id);
}
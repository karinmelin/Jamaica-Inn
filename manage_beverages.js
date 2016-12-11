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
function manageBevPageLoaded() {
	checkLang();
    chooseDrinks();
}

function chooseDrinks() {
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
    
    /* fetching the drink list from the local storage */
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    
    /* Loading all drinks available into a dropdown for each slot
    for the admin to choose which drink is in each slot */
    api.fetchBev(function(list) {
        
        var json = JSON.parse(list);
        var payload = json.payload;
        
        for (var i = 1; i < 21; i++) {
            var dropDown = document.getElementById("drinkChoice" + i);
        
            for (var i2 = 8; i2 < payload.length; i2++) {
                var option = document.createElement("option");
            
                var drink_name = payload[i2].namn;
                var drink_name2 = payload[i2].namn2;
            
                var node = document.createTextNode(drink_name + "-" + drink_name2);
                option.appendChild(node);
                dropDown.appendChild(option);
            }
        }
        
        /* For each slot checking which drink should be selected in the dropdown
        also diplaying which drink is currently located in each slot */
        for (var n = 0; n < 20; n++) {
            n1 = n+1;
            var dropDown = document.getElementById("drinkChoice" + n1);
            var currentDrinkName = data[n].namn;
            var currentDrinkName2 = data[n].namn2;
            var currentDrink = currentDrinkName + "-" + currentDrinkName2;
            
            //console.log(payload.length);
            //console.log(dropDown.options[160].text)
            
            var k = 0;
            while (k < payload.length && k > -1) {
                //console.log(k);
                var drinkInList = dropDown.options[k].text;
                var drinkInListOption = dropDown[k];
                
                if (drinkInList == currentDrink) {
                    dropDown.options.selectedIndex = k; 
                    break;
                } else {
                    k++;
                    i++;
                }
            }
            
            /* adding the price and the units for the drink in slot */
            var price = data[n].price;
            var amount = data[n].count;
            
            document.querySelector('#manPrice' + n1).innerHTML = price + ":-";
            document.querySelector('#manAmount' + n1).innerHTML = amount + " units";
        }
    });
}

/* When changing drink in dropdown the drink is updated in the slot
also updating the page to set the current price and amount of the drink in stock */
document.addEventListener("change", function(event) {
    
    var api = new APIConnect();
    
    console.log('inne i event');
    
    /* getting then name of the new drink chosen in dropdown */
    var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
    var newDrink = elem.value || elem.options[elem.selectedIndex].value;
    
    /* Gettin the number of the drink from the id
    which gives the index of the drink list where the current drink can be found*/
    var newDrink_id = elem.id;
    if (newDrink_id.length == 13) {
        var id_nr = newDrink_id.substr(newDrink_id.length - 2);
    } else {
        var id_nr = newDrink_id.substr(newDrink_id.length - 1);
    }
    
    var id_nr = id_nr - 1;
    /* fetching the locally stored drink list */
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    
    /* find the new drink chosen in the API and update the drink list
    with the new drink */
    api.fetchBev(function(list) {
        
        var json = JSON.parse(list);
        var payload = json.payload;
        
        for (var i = 0; i < payload.length; i++) {
            if (payload[i].namn != undefined) {
                var payload_drink = payload[i].namn + '-' + payload[i].namn2;

                console.log(newDrink_id);
                console.log(i);
                console.log(id_nr);
                console.log(newDrink);
                console.log(payload_drink);
                if (payload_drink == newDrink) {
                    data[id_nr].namn = payload[i].namn;
                    data[id_nr].namn2 = payload[i].namn2;
                    data[id_nr].sbl_price = payload[i].sbl_price;
                    data[id_nr].pub_price = payload[i].pub_price;
                    data[id_nr].beer_id = payload[i].beer_id;
                    data[id_nr].count = payload[i].count;
                    data[id_nr].price = payload[i].price;
                    break;

                    document.querySelector('#manPrice' + n1).innerHTML = price + ":-";
                    document.querySelector('#manAmount' + n1).innerHTML = amount + " units";
                }
            }
        }
        /* save the drink list locally */
        setStock(data);
        localStorage.setItem("drinkList", JSON.stringify(drinkList));
        location.reload();
    });
});

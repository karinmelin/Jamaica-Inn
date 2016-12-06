// check if page loaded
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

//go to connectAPI to fetch info from API
function bevPageLoaded() {
	connectAPI();
}

// connects to the server and fetching the info needed for the beverages
function connectAPI() {
    var api = new APIConnect();
    
    //setting the user to jorass for building url
    api.setUser('jorass', 'jorass');
    
    //fetch info about the user of choice
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
    });
    
    api.fetchBev(function(bevList) {
        
        var json = JSON.parse(bevList);
        var payload = json.payload;
        
        //looping through payload 
        for (var i = 1; i < 21; i++) {
            var n = i + 89;
            var beer_name = payload[n].namn;
            var beer_td = 'drink' + i + 'p';
            
            document.querySelector('#' + beer_td).innerHTML = beer_name;
            
            var beer_id = payload[n].beer_id;
            console.log(beer_id);
            
            //check if non-alcoholic drink and adding a label if so
            checkAlcohol(api, beer_id, i, n);
            
            //adding amount and price for each beverage
            var amount = payload[n].count;
            var price = payload[n].price;
            
            if (amount > 0) {
                document.querySelector('#amount' + i).innerHTML = amount + ' units';
            } else {
                document.querySelector('#amount' + i).innerHTML = 'Refill me';
            }
            
            document.querySelector('#price' + i).innerHTML = price + ':-';
            
        }
        
    });
    
    
function checkAlcohol(api, beer_id, i, n) {
    
    api.fetchBevType(function(bev){   
        
        // for testing with non-alcoholic: beer_id = 197702
        
        console.log(bev);
        var json = JSON.parse(bev);
        var payload_type = json.payload;
        //console.log(payload_type);
        console.log('innan varugrupp ' + n);
        var beer_type = payload_type[0].varugrupp;
                
        var alcFree = 'Alkoholfritt, Övrigt';
        console.log(beer_type);
        console.log(alcFree);
        console.log(n);
        if (beer_type === alcFree) {
            console.log(i);
            var node = document.querySelector('#drinktype' + i).innerHTML = 'non-alcoholic';
        }
                
    }, beer_id);
}
    
    /*api.fetchBevType(function(beverage) {
        
        var json = JSON.parse(beverage);
        var payload = json.payload;
        
        for (var i = 1; i < payload.length; i++) {
            var beer_name = payload[39+i].namn;
            var beer_id = 'drink' + i;
            document.querySelector('#' + beer_id).innerHTML = beer_name;
        }
        
    });*/
    
    
    api.fetchPrevDrinks(function(list) {

        var json = JSON.parse(list);
        var payload = json.payload;
        
        for (var i = 0; i < payload.length; i++) {
            
            var drink = payload[i+2].namn;
            var timeStamp = payload[i+2].timestamp;
            var price = payload[i+2].price;
            
            var para = document.createElement("p");
            var node = document.createTextNode(timeStamp + ' ' + drink + ' ' + price + ':-');
            para.appendChild(node);
            
            var prevDrink = document.getElementById("prevDrinks");
            prevDrink.appendChild(para);
        }
        
    });
	

	
}

document.addEventListener("drop", function(event) {
    
    var cart = document.getElementById('shop');
    var drink_id = event.dataTransfer.getData('text');
    
    console.log(drink_id);
    var drink_ptag = document.getElementById(drink_id);
    var drink_name = drink_ptag.getElementsByTagName('p')[0].innerHTML;
    
    var node = document.createTextNode(drink_name);
    var para = document.createElement("p");
    para.appendChild(node);
    cart.appendChild(para);
    
    console.log(drink_name);
});

/*function addToCart() {
    var cart = document.getElementById('shop');
    var drink = event.srcElement;
    //var drink = event.target.id;
    // Vill hämta id från den div som läggs i cart - googla det här!
    console.log(drink);
    var beer_name = beer.getElementsByTagName('p')[0].innerHTML;
    console.log(beer_name);
    
    var node = document.createTextNode(beer_name);
    cart.appendChild(node);
};*/
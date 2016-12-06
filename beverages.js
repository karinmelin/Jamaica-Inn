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
    
    chooseInitDrinks(api);
    
    /*api.fetchBev(function(bevList) {
        
        var json = JSON.parse(bevList);
        var payload = json.payload;
        
        //looping through payload
        
        
        for (var i = 1; i < 21; i++) {
            var n = i + 89;
            var beer_name = payload[n].namn;
            var beer_td = 'drink' + i + 'p';
            
            document.querySelector('#' + beer_td).innerHTML = beer_name;
            
            var beer_id = payload[n].beer_id;
            //console.log(beer_id);
            
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
        //console.log('innan varugrupp ' + n);
        var beer_type = payload_type[0].varugrupp;
                
        var alcFree = 'Alkoholfritt, Övrigt';
        
        if (beer_type === alcFree) {
            console.log(i);
            var node = document.querySelector('#drinktype' + i).innerHTML = 'non-alcoholic';
        }
                
    }, beer_id);
}
    
    api.fetchBevType(function(beverage) {
        
        var json = JSON.parse(beverage);
        var payload = json.payload;
        
        for (var i = 1; i < payload.length; i++) {
            var beer_name = payload[39+i].namn;
            var beer_id = 'drink' + i;
            document.querySelector('#' + beer_id).innerHTML = beer_name;
        }
        
    });*/
    
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

function chooseInitDrinks(api) {
    /*we set the user to the values the user entered through the form*/
    api.setUser('jorass', 'jorass');
    console.log('inne i chooseinitDrinks');
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    
    api.fetchBev(function(bevList) {
        
        /*var json = JSON.parse(bevList);
        var payload = json.payload;*/
        
        //looping through drinkList
        for (var i = 0; i < 20; i++) {
            console.log(data[i]);
            var drink_name = data[i].namn + ' ' + data[i].namn2;
            console.log(drink_name);
            
            var n = i+1;
            var drink_td = 'drink' + n + 'p';
            console.log(drink_td);
            console.log(i);
            
            document.querySelector('#' + drink_td).innerHTML = drink_name;
            
            var drink_id = data[i].beer_id;
            //console.log(drink_id);
            
            //check if non-alcoholic drink and adding a label if so
            checkAlcohol(api, drink_id, n);
            
            //adding amount and price for each beverage
            var amount = data[i].count;
            var price = data[i].price;
            
            if (amount < 0) {
                document.querySelector('#amount' + n).innerHTML = 'Refill me';
            } else {
                document.querySelector('#amount' + n).innerHTML = amount + ' units';
            }
            
            document.querySelector('#price' + n).innerHTML = price + ':-';
            
        }
        
    });
    
    
    function checkAlcohol(api, beer_id, n) {
    
        api.fetchBevType(function(bev){   
        
        // for testing with non-alcoholic: beer_id = 197702
        
        //console.log(bev);
        var json = JSON.parse(bev);
        var payload_type = json.payload;
        //console.log(payload_type);
        //console.log('innan varugrupp ' + n);
        var beer_type = payload_type[0].varugrupp;
                
        if (beer_type === 'Alkoholfritt, Övrigt'|| beer_type === 'Alkoholfritt, Öl' || beer_type === 'Alkoholfritt, Must') {
            //console.log(i);
            var node = document.querySelector('#drinktype' + n).innerHTML = 'non-alcoholic';
            }
                
        }, beer_id);
    }
    
    //alert(drinkList);
    /*for (var i = 0; i < 21; i++) {
        
        drinkList[i] = ;
    }*/
    
}
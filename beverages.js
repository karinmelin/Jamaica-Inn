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
            var n = i + 8;
            var beer_name = payload[n].namn;
            var beer_td = 'drink' + i;
            document.querySelector('#' + beer_td).innerHTML = beer_name;
            
            var beer_id = payload[n].beer_id;
            console.log(beer_id);
            
            checkAlcohol(api, beer_id, i, n);
            
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
	
	api.fetchUsers(function(list) {
		var json = JSON.parse(list);
        var payload = json.payload;
        

        for (var i = 0; i < payload.length; i++) {
			var email = payload[i+13].email;
            var first_name = payload[i+13].first_name;
            var last_name = payload[i+13].last_name;
            var username = payload[i+13].username;
			
			var newline = document.createElement("br");
		
			var node = document.createTextNode(first_name + ' ' +last_name + ' ' + email + ' ' + username);
			
			document.getElementById("users").appendChild(node);
			document.getElementById("users").appendChild(newline);

        }

		
       
    });
    
}
// check if page loaded
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function bevPageLoaded() {
	connectAPI();
}

// connects to the server
function connectAPI() {
    var api = new APIConnect();
    
    api.setUser('jorass', 'jorass');
    
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
        
        for (var i = 1; i < payload.length; i++) {
            var beer_name = payload[39+i].namn;
            var beer_td = 'drink' + i;
            document.querySelector('#' + beer_td).innerHTML = beer_name;
            
            var beer_id = payload[i].beer_id;
            
            api.fetchBevType(function(bev){
            
                var json = JSON.parse(bev);
                var payload_type = json.payload;
                
                var beer_type = payload_type[0].varugrupp;
                
                //var alcFreeList = [];
                
                if 
                document.querySelector('#drink1type').innerHTML = beer_type;
                
            }, beer_id);
            
        }
        
    });
    
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
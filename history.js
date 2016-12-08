function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function loadHistory() {
    var api = new APIConnect();
    
    //setting the user to jorass for building url
    api.setUser('jorass', 'jorass');
    
    //fetch info about the user of choice
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        console.log(payload);
        
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
    
}
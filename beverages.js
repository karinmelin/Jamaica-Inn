function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function connectAPI() {
    var api = new APIConnect();
    
    api.setUser('jorass', 'jorass');
    
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var assets = payload[0].assets
        document.querySelector('#assets').innerHTML = assets;
    });
    
    api.fetchBev(function(bevList) {
        
        var json = JSON.parse(bevList);
        var payload = json.payload;
        
        for (var i = 1; i < payload.length; i++) {
            var beer_name = payload[70+i].namn;
            var beer_id = 'drink' + i;
            document.querySelector('#' + beer_id).innerHTML = beer_name;
        }
        
    });
    
    
}

function bevPageLoaded() {
	connectAPI();
}
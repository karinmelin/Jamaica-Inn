/* check if page loaded */
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
/* Displays all beverages. Uses api functions fetchIOU and fetchPrevDrinks from api.js.
This function is called from admin_history.js when loaded. */
function loadHistory() {
    checkLang();
    var api = new APIConnect();
    var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
    
	 /* from the API, fetching the name and assets
    for the user for display in header */
    api.fetchIOU(function(usr) {
        var json = JSON.parse(usr);
        var payload = json.payload;
        console.log(payload);
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
        
    });
    
	/* This is the API function that displays previously bought
    drinks on the 'Previosly Bought' page */
    api.fetchPrevDrinks(function(list) {
        var json = JSON.parse(list);
        var payload = json.payload;
        
        for (var i = 0; i < payload.length-2; i++) {
            
            var drink = payload[i+2].namn + ' ' + payload[i+2].namn2;
            var timeStamp = payload[i+2].timestamp;
            var price = payload[i+2].price + ':-';
            
            var var_array = [drink, timeStamp, price];
            var history_table = document.getElementById("history_tbl");
            
            loadIntoTable(var_array, history_table, i, "no"); //function in users.js
            
            /*var para = document.createElement("p");
            var node = document.createTextNode(timeStamp + ' ' + drink + ' ' + price + ':-');
            para.appendChild(node);
            
            var prevDrink = document.getElementById("prevDrinks");
            prevDrink.appendChild(para);*/
        }
        
    });
    
}
/* The purpose of this file is that the admin should be able to create a new user or edit an existing user
File was created by by Filip Törnvist 2016 */

/* Check if page loaded.*/
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/* This function displays all beverages when admin_view_beverages.html is loaded.
It also stores the username and password in localStorage. The API function used here is fetchBev, which is located
in api.js */
function loadAllBeverages() {
    checkLang();
	var api = new APIConnect();
    
    var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
    
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
    });
	
    api.fetchBev(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length-7; i++) {
			var namn = payload[i+7].namn;
            var namn2 = payload[i+7].namn2;
            //var sbl_price = payload[i+7].sbl_price;
            //var pub_price = payload[i+7].pub_price;
			var beer_id = payload[i+7].beer_id;
			var count = payload[i+7].count;
			var price = payload[i+7].price;
			//para = document.createElement("p");
			
            var var_array = [namn + namn2, price, count];
            var edit_stock_table = document.getElementById('edit_stock_tbl');
            
            loadIntoTable(var_array, edit_stock_table, i); //users.js
            
			/*var node = document.createTextNode(namn + ' ' + namn2 + '\u00A0\u00A0\u00A0\u00A0' + price + ':-' +'\u00A0\u00A0\u00A0\u00A0' + count);
			para.appendChild(node);

			var userList = document.getElementById("view_beverages");
			userList.appendChild(para);*/
        }
    });
}
	



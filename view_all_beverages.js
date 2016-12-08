// check if page loaded
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}



function loadAllBeverages() {
	var api = new APIConnect();
    
    //setting the user
    var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
	
    api.fetchBev(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length; i++) {
			var namn = payload[i+7].namn;
            var namn2 = payload[i+7].namn2;
            var sbl_price = payload[i+7].sbl_price;
            var pub_price = payload[i+7].pub_price;
			var beer_id = payload[i+7].beer_id;
			var count = payload[i+7].count;
			var price = payload[i+7].price;
			para = document.createElement("p");
			
			var node = document.createTextNode(namn + ' ' + namn2 + '\u00A0\u00A0\u00A0\u00A0' + price + ':-' +'\u00A0\u00A0\u00A0\u00A0' + count);
			para.appendChild(node);

			var userList = document.getElementById("all_beverages");
			userList.appendChild(para);
			

        }
		
    });
}
	



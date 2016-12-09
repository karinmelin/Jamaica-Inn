/* 
Script for loading all users from the API into
the 'Manage users' page for the admin to view.

Author: Filip Törnqvist 2016
*/


/* check if page loaded, then continuing to the function called from page */
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function loadAllUsers() {
    //create the connection object to the APi
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
        console.log(payload);
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
        
    });
    
    /* Looping through all users from API
    and displaying their info under 'All users'
    in 'Manage users'page */
	api.fetchUsers(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length; i++) {
			var email = payload[i+13].email;
            var first_name = payload[i+13].first_name;
            var last_name = payload[i+13].last_name;
            var username = payload[i+13].username;
			var phone = payload[i+13].phone;

			para = document.createElement("div");
			
			var node = document.createTextNode(username + ' ' + first_name + ' ' + last_name + ' ' + email  + ' ' + phone);
			para.appendChild(node);

			var userList = document.getElementById("users");
			userList.appendChild(para);
        }
    });
}
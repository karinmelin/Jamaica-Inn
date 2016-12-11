/* 
Script for loading all users from the API into
the Manage users and Admin manage balance for the admin to view.

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
    checkLang();
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

        for (var i = 0; i < payload.length-13; i++) {
			var username = payload[i+13].username;
            var first_name = payload[i+13].first_name;
            var last_name = payload[i+13].last_name;
            var email = payload[i+13].email;
			var phone = payload[i+13].phone;
            
            var edit_user_table = document.getElementById("edit_user_tbl");
            
            var tr = document.createElement('TR');
            var username_td = document.createElement('TD');
            var first_name_td = document.createElement('TD');
            var last_name_td = document.createElement('TD');
            var email_td = document.createElement('TD');
			var phone_td = document.createElement('TD');
            var edit_btn_td = document.createElement('TD');
            var edit_btn = document.createElement('BUTTON');
            
            edit_btn.setAttribute('type','submit');
            edit_btn.innerHTML = 'Edit';
            
            var username_node = document.createTextNode(username);
            var first_name_node = document.createTextNode(first_name);
            var last_name_node = document.createTextNode(last_name);
            var email_node = document.createTextNode(email);
            var phone_node = document.createTextNode(phone);
            
            username_td.appendChild(username_node);
            first_name_td.appendChild(first_name_node);
            last_name_td.appendChild(last_name_node);
            email_td.appendChild(email_node);
            phone_td.appendChild(phone_node);
            edit_btn_td.appendChild(edit_btn);
            
            tr.appendChild(username_td);
            tr.appendChild(first_name_td);
            tr.appendChild(last_name_td);
            tr.appendChild(email_td);
            tr.appendChild(phone_td);
            tr.appendChild(edit_btn_td);
            
            edit_user_table.appendChild(tr);
            
			/*para = document.createElement("div");
			
			var node = document.createTextNode(username + ' ' + first_name + ' ' + last_name + ' ' + email  + ' ' + phone);
			para.appendChild(node);

			var userList = document.getElementById("users");
			userList.appendChild(para);*/
        }
    });
}
/*Loads all users and their balance into admin_manage_balance.html */
function loadAllUsersAndBalance() {
    checkLang();
    
	var api = new APIConnect();
    
	var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
    
    api.fetchIOU(function(usr) {
        var json = JSON.parse(usr);
        var payload = json.payload;
        console.log(payload);
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
    });
    
	api.fetchAllIOU(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;
        
        /* Looping through all users in API and loading
        their name and current assets into a table*/
        var t = payload.length-13;
        for (var i = 0; i < t; i++) {
            var username = payload[i+13].username;
			var assets = payload[i+13].assets;
            
            var user_balance_table = document.getElementById("user_balance_tbl");
            
            var tr = document.createElement('TR');
            var td1 = document.createElement('TD');
            var td2 = document.createElement('TD');
            var node1 = document.createTextNode(username);
            var node2 = document.createTextNode(assets + ':-');
            td1.appendChild(node1);
            td2.appendChild(node2);
            tr.appendChild(td1);
            tr.appendChild(td2);
            user_balance_table.appendChild(tr);
        }
    });
		
}
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
    
    
    /* Looping through all users from API and displaying their info in a table 
    under 'All users' in 'Manage users' page.
    The same function is used for both 'Add user' and 'Edit user' */
	api.fetchUsers(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length-13; i++) {
			var username = payload[i+13].username;
            var first_name = payload[i+13].first_name;
            var last_name = payload[i+13].last_name;
            var email = payload[i+13].email;
			var phone = payload[i+13].phone;
            
            var var_array = [username, first_name, last_name, email, phone];
            var add_user_table = document.getElementById("add_user_tbl");
            var edit_user_table = document.getElementById("edit_user_tbl");
            
            /* Checks which page of 'Add user' or 'Edit user' the
            user list should be loaded into */
            if (edit_user_table != null) {
                //console.log("edit_user_table inte null");
                loadIntoTable(var_array, edit_user_table, i, "yes");
            } else if (add_user_table != null) {
                //console.log("add_user_table inte null");
                loadIntoTable(var_array, add_user_table, i, "no");
            }
            
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
            
            var var_array = [username, assets];
            
            var user_balance_table = document.getElementById("user_balance_tbl");
            
            loadIntoTable(var_array, user_balance_table, i, "yes");
        }
    });
}

/*
loadIntoTable();
function that takes variables from a list and a table 
and append the variables together with an edit button 
*/
function loadIntoTable(var_array, var_table, i, add_edit_btn) {
    
    console.log(add_edit_btn);
    var var_tr = document.createElement('TR');
    
    for (var j = 0; j < var_array.length; j++) {
        
        var var_td = document.createElement('TD');
        var var_textNode = document.createTextNode(var_array[j]);
        
        var_td.appendChild(var_textNode);
        var_tr.appendChild(var_td);
    }
    
    if (add_edit_btn == "yes") {
        var edit_btn_td = document.createElement('TD');
        var edit_btn = document.createElement('BUTTON');

        edit_btn.setAttribute('type','submit');
        edit_btn.setAttribute('id','edit_btn' + i);
        edit_btn.innerHTML = 'Edit';

        edit_btn_td.appendChild(edit_btn);
        var_tr.appendChild(edit_btn_td);
    }
    
    var_table.appendChild(var_tr);
}
/* The purpose of this file is that the admin should be able to create a new user or edit an existing user
File was created by by Filip Törnqvist 2016 */

/*This function is called by clicking the button saveuser_button that exits in the file admin_manage_users.html
The function catches what the admin enters into the fields on the page admin_manage_users.html and passes it to the function setNewUser()*/
function saveNewUser() {
	var new_username;
	var new_password;
	var first_name;
	var last_name;
	var email;
	var phone;
	
	new_username = adduserform.elements["uname"].value;
	new_password = adduserform.elements["psw"].value;
	first_name = adduserform.elements["fname"].value;
	last_name = adduserform.elements["lname"].value;
	email = adduserform.elements["email"].value;
	phone = adduserform.elements["phone"].value;
	
	setNewUser(new_username, new_password, first_name,last_name, email, phone);
}

/*This function accepts arguments from the function above and sets the entered username and password as localStorage variables.
The main part of the function is that it passes the arguments from the previous function to the function api.setNewuser 
(located in the file api.js), which in turn updates an existing user or creates a new one. */
function setNewUser(new_username, new_password, first_name,last_name, email, phone) {
	var api = new APIConnect();
    
    //setting the user
    var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
    
	api.setNewUser(function(list) {
		
		},new_username, new_password, first_name, last_name, email, phone); 
	}


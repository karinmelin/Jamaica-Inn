/* The purpose of this file is that the admin should be able to create a new user or edit an existing user
File was created by Filip Törnqvist  */

/*This function is called by clicking the button saveuser_button that exits in the file admin_manage_users.html
The function catches what the admin enters into the fields on the page admin_manage_users.html and passes it to the function setNewUser()*/
function saveNewUser() {
	var new_username;
	var new_password;
	var first_name;
	var last_name;
	var email;
	var phone;
	
	new_username = adduserform.elements["fname"].value;
	new_password = adduserform.elements["psw"].value;
	first_name = adduserform.elements["uname"].value;
	last_name = adduserform.elements["lname"].value;
	email = adduserform.elements["emailplaceholder"].value;
	phone = adduserform.elements["phoneplaceholder"].value;
	
	setNewUser(new_username, new_password, first_name,last_name, email, phone);
    
    confirmation_show();
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

function add_user() {
    console.log("inne i add_user");
    var new_username = adduserform.elements["fname"].value;
	var new_password = adduserform.elements["psw"].value;
	var first_name = adduserform.elements["uname"].value;
	var last_name = adduserform.elements["lname"].value;
	var email = adduserform.elements["emailplaceholder"].value;
	var phone = adduserform.elements["phoneplaceholder"].value;
	
	setNewUser(new_username, new_password, first_name,last_name, email, phone);
    
    confirmation_show();

}

function edit_beverage() {
    confirmation_show();
}

//Function To Display Popup
function confirmation_show() {
    console.log("inne i confirmation_show");
    var pop_up = document.getElementById('confirmation_popup_display');
    pop_up.style.display = "block";
    console.log(pop_up.style.overflow);
    console.log(pop_up.style.visibility);
    
}

//Function to Hide Popup
function confirmation_hide(){
    console.log('inne i confirmation_hide');
    document.getElementById('confirmation_popup_display').style.display = "none";
}
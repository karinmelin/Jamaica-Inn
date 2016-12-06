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
	email = adduserform.elements["email"].value;
	phone = adduserform.elements["phone"].value;
	
	setNewUser(new_username, new_password, first_name,last_name, email, phone);
}


function setNewUser(new_username, new_password, first_name,last_name, email, phone) {
	var api = new APIConnect();
	api.setUser('jorass', 'jorass');
	api.setNewUser(function(list) {
		
		},new_username, new_password, first_name, last_name, email, phone); 
	}


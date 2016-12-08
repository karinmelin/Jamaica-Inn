// check if page loaded
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}



function loadAllUsers() {
	var api = new APIConnect();
    
	var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    
    api.setUser(username, password);
    
    //fetch info about the user of choice
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        console.log(payload);
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
        
    });
    
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
			//para.onclick = function (e) { alert('test') };
			
			var node = document.createTextNode(first_name + ' ' +last_name + ' ' + email + ' ' + username + ' ' + phone);
			para.appendChild(node);

			var userList = document.getElementById("users");
			userList.appendChild(para);
			

        }
		
    });
}
	


/*function copyToEditUserForm() {


}*/
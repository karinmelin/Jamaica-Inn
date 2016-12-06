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
	api.setUser('jorass', 'jorass');
	api.fetchUsers(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length; i++) {
			var email = payload[i+13].email;
            var first_name = payload[i+13].first_name;
            var last_name = payload[i+13].last_name;
            var username = payload[i+13].username;
			
			var para = document.createElement("p");
			var node = document.createTextNode(first_name + ' ' +last_name + ' ' + email + ' ' + username);
			para.appendChild(node);
			
			var userList = document.getElementById("users");
			userList.appendChild(para);
			

        }
       
    });
}
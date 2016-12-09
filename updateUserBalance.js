	function loadAllUsersAndBalance() {
	var api = new APIConnect();
	var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);
	api.fetchAllIOU(function(list) {

		var json = JSON.parse(list);
        var payload = json.payload;

        for (var i = 0; i < payload.length; i++) {
            var username = payload[i+13].username;
			var assets = payload[i+13].assets;
			para = document.createElement("div");
			
			var node = document.createTextNode(username + ' ' + assets);
			para.appendChild(node);

			var userList = document.getElementById("users_balance");
			userList.appendChild(para);
        }
    });
		
}
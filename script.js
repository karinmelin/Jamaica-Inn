function docLoaded(fn) {
	if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function connectToAPI() {
    var api = new APIConnect();
	/*btn = document.getElementById("b1");*/

    api.setUser('jorass', 'jorass');
    /*btn.addEventListener('click', function() { loadUsers(api) });*/

    api.fetchIOU(function(usr) {  
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var name = payload[0].first_name;
        var credit = payload[0].assets;
        
        document.querySelector('.username').innerHTML = name;
        document.querySelector('.credit').innerHTML = credit;
        
    });
}

function pageLoaded() {
	connectToAPI();
}
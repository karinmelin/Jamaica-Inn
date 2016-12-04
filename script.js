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

    var btn = document.getElementById("staffBtn");
    
    api.setUser('jorass', 'jorass');
    /*btn.addEventListener('click', function() { loadUsers(api) });*/

    btn.addEventListener('click', function() { checkLogin(api); });
    

}

function pageLoaded() {
	connectToAPI();
}

/* ------------------------- Login  ------------------- */

function loginAdmin() {
    checkLogin();

}

function openNewWindow() {
window.location.assign('allbeverages.html');
}

function openCreateUser() {
window.location.assign('admin_addusers.html');
}

function openAdminUsers() {
window.location.assign('adminusers.html');
	
}


function checkLogin() {
    /*Here we get values from the login form and save APIConnect() in a variable*/
    var loginForm = document.forms["login"];
    var username = loginForm.elements["uname"].value;
    var password = loginForm.elements["psw"].value;
    var api = new APIConnect();

    /*we set the user to the values the user entered through the form*/
    api.setUser(username, password);

	/*FetchIOU and store username and password in localStorage*/
    api.fetchIOU(function(data){
        var json = JSON.parse(data);

        if (json.type === 'error') {
		alert('Wrong username or password. Please try again.');          
        } else if (username === 'ervtod' && password === 'ervtod' || username === 'hirchr' && password === 'hirchr' || username === 'jorass' && password === 'jorass' || username === 'saskru' && password === 'saskru' || username === 'svetor' && password === 'svetor'){   
			localStorage.localPassword = password; 
            localStorage.localUsername = username;
            window.location.assign("adminallbeverages.html") //Send admins to admin page
        } else {
			window.location.assign("allbeverages.html") //Send all users that are not admins to non-admin version of the site
            localStorage.localPassword = password; 
            localStorage.localUsername = username;
		}
    });
}
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
    
    /*api.fetchIOU(function(usr) {  
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var name = payload[0].first_name;
        var credit = payload[0].assets;
        
        document.querySelector('.username').innerHTML = name;
        document.querySelector('.credit').innerHTML = credit;
    });
    
    api.getBev(function(bevList) {
        
        var json = JSON.parse(bevList);
        var payload = json.payload;
        
        for (var i = 0; i < payload.length; i++) {
            var beer_name = payload[7+i].namn;
            var beer_id = 'bev' + i;
            document.querySelector('#' + beer_id).innerHTML = beer_name;
        }
        
    }); */
}

function pageLoaded() {
	connectToAPI();
}

/* ------------------------- Login  ------------------- */

function loginAdmin() {
    
    /*var username = document.getElementById('unameInput').value;*/
    checkLogin();
    /*window.open("http://127.0.0.1:50415/allbeverages.html")*/
}

/*function connectLogin(form) {
    
    var api = new APIConnect();
    /*btn = document.getElementById("staffBtn");*/
    
    /*api.setUser('jorass', 'jorass');
    
    /*btn.addEventListener('click', function() { loadUsers(api) });*/

    /*var user_name = document.querySelector("#unameInput").value;
    alert('inne i connectLogin');
    api.fetchUsers(function (loginUsr) {
        
        var json = JSON.parse(loginUsr),
            payload = json.payload,
            username = payload[0].username;
        
        if (document.querySelector("#unameInput").value == username) {
            document.location.href = "jamaicaLogin/allbeverages.html";
        }
    });
}*/

function openNewWindow() {
    alert ('byta fönster');
    window.open("http://127.0.0.1:50415/allbeverages.html");
}

function checkLogin() {
    var api = new APIConnect(), 
        /*usernameForm = document.getElementById('unameInput').value,*/
        usernameAPI = "";
    
    alert('inne i checkLogin');
    
    api.setUser('jorass', 'jorass')
    
    api.fetchAllIOU(function (usr) {
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var username = pay
        
        alert('hamtat payload');
        
        window.open('http://127.0.0.1:50415/allbeverages.html');
        
    });

    
    /* HÄR MÅSTE DU LÖSA SÅ ATT SIDAN GÅR VIDARE BARA OM LOGIN ÄR RÄTT!!!*/
    
    /*api.fetchAllIOU(function(usr) {
        
        alert('usr');
        
        var username = "",
            json = JSON.parse(usr),
            payload = json.payload;
        
        alert(username);
        var i = 0;
        for (i; i < payload.length; i++) {
            var usernameTemp = payload[i].username;
            if (usernameForm == usernameTemp) {
                username = usernameForm;
            }
        }
        
        var usernameAPI = payload[0].username;
        
        alert(username);
        alert(usernameForm);
        
        if (usernameForm == username) {
            alert('inne i if-satsen');
        }
    });*/
}
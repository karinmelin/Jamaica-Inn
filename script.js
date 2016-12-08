function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function connectToAPI() {
    var api = new APIConnect();

    /*var btn = document.getElementById("staffBtn");*/
    
    var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);

    btn.addEventListener('click', function() { checkLogin(api); });
    
}

function pageLoaded() {
	connectToAPI();
}

/* ------------------------- Login  ------------------- */

function loginAdmin() {
    checkLogin();

}

/*function openNewWindow() {
window.location.assign('allbeverages.html');
}

function openCreateUser() {
window.location.assign('admin_addusers.html');
}

function openAdminUsers() {
window.location.assign('adminusers.html');
	
}
*/

function checkLogin() {
    /*Here we get values from the login form and save APIConnect() in a variable*/
    var loginForm = document.forms["loginform"];
    var username = loginForm.elements["uname"].value;
    var password = loginForm.elements["psw"].value;
    
    var api = new APIConnect();

    /*set the user to the values the user entered through the form*/
    api.setUser(username, password);

	/*FetchIOU and store username and password in localStorage*/
    api.fetchIOU(function(data){
        var json = JSON.parse(data);
        var payload = json.payload;

        if (json.type === 'error') {
		alert('Wrong username or password. Please try again.');          
        } else if (username === 'ervtod' && password === 'ervtod' || username === 'hirchr' && password === 'hirchr' || username === 'jorass' && password === 'jorass' || username === 'saskru' && password === 'saskru' || username === 'svetor' && password === 'svetor'){   
			localStorage.localPassword = password; 
            localStorage.localUsername = username;
            window.location.assign("admin_allbeverages.html") //Send admins to admin page
        } else {
			window.location.assign("user_allbeverages.html") //Send all users that are not admins to non-admin version of the site
            localStorage.localPassword = password; 
            localStorage.localUsername = username;
		}
    
        /*//setting the logged in user as the current user and store it locally
        alert(payload[0].first_name);
        
        var currentUser = {"info":[{"user_id": payload[0].user_id, "first_name": payload[0].first_name, "last_name": payload[0].last_name, "assets": payload[0].assets}]};
        
        localStorage.setItem("currentUser", JSON.stringify(currentUser));*/
    });
    
    /*add a dictionary locally stored, for containing drinks
    beer, cider, wine, non-alcoholic*/
    var drinkList = {"data":[{
		"namn": "Brooklyn Lager",
		"namn2": "",
		"sbl_price": "17.90",
		"pub_price": "20",
		"beer_id": "154803",
		"count": "4",
		"price": "16.90"
	}, {
		"namn": "Kiviks Williams",
		"namn2": "Päroncider Halvtorr",
		"sbl_price": "19.90",
		"pub_price": "25",
		"beer_id": "183203",
		"count": "199",
		"price": "18.90"
	}, {
		"namn": "Ecologica",
		"namn2": "Shiraz Malbec",
		"sbl_price": "69.00",
		"pub_price": "75",
		"beer_id": "651201",
		"count": "194",
		"price": "69.00"
	}, {
		"namn": "BEO",
		"namn2": "Blood Orange Hibiscus",
		"sbl_price": "12.90",
		"pub_price": "15",
		"beer_id": "197302",
		"count": "-2",
		"price": "12.90"
	}, {
		"namn": "Lapin Kulta",
		"namn2": "",
		"sbl_price": "13.40",
		"pub_price": "15",
		"beer_id": "159412",
		"count": "1",
		"price": "13.10"
	}, {
		"namn": "Somersby",
		"namn2": "Apple Cider Organic",
		"sbl_price": "17.20",
		"pub_price": "20",
		"beer_id": "183502",
		"count": "198",
		"price": "16.90"
	}, {
		"namn": "Casillero del Diablo",
		"namn2": "Chardonnay",
		"sbl_price": "29.00",
		"pub_price": "35",
		"beer_id": "207504",
		"count": "203",
		"price": "30.00"
	}, {
		"namn": "Mariestads",
		"namn2": "Alkoholfri",
		"sbl_price": "10.90",
		"pub_price": "15",
		"beer_id": "195202",
		"count": "199",
		"price": "10.90"
	}, {
		"namn": "Zeunerts",
		"namn2": "Höga Kusten",
		"sbl_price": "15.40",
		"pub_price": "20",
		"beer_id": "148001",
		"count": "-1",
		"price": "15.40"
	}, {
		"namn": "Strongbow",
		"namn2": "",
		"sbl_price": "15.50",
		"pub_price": "20",
		"beer_id": "181902",
		"count": "188",
		"price": "15.50"
	}, {
		"namn": "Viña Maipo",
		"namn2": "Chardonnay",
		"sbl_price": "33.00",
		"pub_price": "35",
		"beer_id": "667102",
		"count": "188",
		"price": "33.00"
	}, {
		"namn": "Rabarbernektar",
		"namn2": "",
		"sbl_price": "39.00",
		"pub_price": "45",
		"beer_id": "194203",
		"count": "183",
		"price": "39.00"
	}, {
		"namn": "S:t Eriks",
		"namn2": "Oktoberfest",
		"sbl_price": "16.90",
		"pub_price": "20",
		"beer_id": "1125303",
		"count": "197",
		"price": "16.90"
	}, {
		"namn": "Wyld Wood",
		"namn2": "Organic",
		"sbl_price": "27.90",
		"pub_price": "30",
		"beer_id": "186602",
		"count": "194",
		"price": "27.90"
	}, {
		"namn": "Chilcas",
		"namn2": "Sauvignon Blanc",
		"sbl_price": "46.00",
		"pub_price": "50",
		"beer_id": "669702",
		"count": "200",
		"price": "45.00"
	}, {
		"namn": "Xide Non Alco",
		"namn2": "Lemon Dragonfruit",
		"sbl_price": "13.90",
		"pub_price": "15",
		"beer_id": "192003",
		"count": "196",
		"price": "13.90"
	}, {
		"namn": "Samuel Adams",
		"namn2": "Boston Lager",
		"sbl_price": "17.90",
		"pub_price": "20",
		"beer_id": "154603",
		"count": "195",
		"price": "15.90"
	}, {
		"namn": "Somersby",
		"namn2": "Pear Cider",
		"sbl_price": "17.20",
		"pub_price": "20",
		"beer_id": "182402",
		"count": "200",
		"price": "16.90"
	}, {
		"namn": "Stoneleigh",
		"namn2": "Riesling",
		"sbl_price": "99.00",
		"pub_price": "105",
		"beer_id": "649801",
		"count": "195",
		"price": "104.00"
	}, {
		"namn": "Staropramen",
		"namn2": "Non-Alcoholic",
		"sbl_price": "12.40",
		"pub_price": "15",
		"beer_id": "193002",
		"count": "192",
		"price": "12.40"
	}]};
    
    localStorage.setItem("drinkList", JSON.stringify(drinkList));
}
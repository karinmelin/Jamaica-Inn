/* 
Script for login of the user from the startpage.
Saves the username, password and the original drinks
found in the vending machine locally.

Authors: Filip Törnqvist & Karin Melin 2016
*/

/* check if page loaded, then continuing to the function called from page */
function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/* when page loaded go through to the next function */
function pageLoaded() {
	connectToAPI();
}

function connectToAPI() {
    //create the connection object to the APi
	var api = new APIConnect();
    
    /* fetching the logged in user and setting 
    the username and password for building the
    url used to connect to the API */
	var username = localStorage.localUsername;
    var password = localStorage.localUsername;
    api.setUser(username, password);

    btn.addEventListener('click', function() { checkLogin(api); });
}

/* ----- Login  ----- */
function loginAdmin() {
    checkLogin();
}

/* Function that validates the username and password
input and if exist in API logs in the user */
function checkLogin() {
    /* Get the values from the login form and
    create the api-object that will connect to the API */
    var loginForm = document.forms["loginform"];
    var username = loginForm.elements["uname"].value;
    var password = loginForm.elements["psw"].value;
    
    var api = new APIConnect();

    /*set the user to the values the user entered through the form*/
    api.setUser(username, password);

	/*Validates against the API if user or admin
    and logs into the user/adminpage,
    storing the username and password in localStorage*/
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
		"namn2": "Apple Green Tea",
		"sbl_price": "12.90",
		"pub_price": "15",
		"beer_id": "197702",
		"count": "-3",
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
		"namn": "Einbecker Brauherren Alkoholfrei",
		"namn2": "",
		"sbl_price": "9.90",
		"pub_price": "15",
		"beer_id": "191402",
		"count": "193",
		"price": "9.90"
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
    
    var data = drinkList.data;
    setStock(data);
    localStorage.setItem("drinkList", JSON.stringify(drinkList));
}

/* function that makes the slots contain a maximum of 10 bottles */
function setStock(data) {
    console.log('inne i setStock');
    for (var i = 0; i < 20; i++) {
        var count = data[i].count;
            if (count > 10) {
                data[i].count = "10";
            }
    }
}
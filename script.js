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
    
    api.setUser('jorass', 'jorass');

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
            window.location.assign("admin_allbeverages.html") //Send admins to admin page
        } else {
			window.location.assign("user_allbeverages.html") //Send all users that are not admins to non-admin version of the site
            localStorage.localPassword = password; 
            localStorage.localUsername = username;
		}
    });
    
    //add a dictionary locally stored, for containing drinks
    var drinkList = {};
    localStorage.setItem("drinkList", JSON.stringify(drinkList));
    chooseInitDrinks(api);
}

function chooseInitDrinks(api) {
    /*we set the user to the values the user entered through the form*/
    api.setUser(username, password);
    
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    
    api.fetchBev(function(bevList) {
        
        var json = JSON.parse(bevList);
        var payload = json.payload;
        
        //looping through drinkList
        for (var i = 1; i < 21; i++) {
            var n = i + 89; //Här ska index för vilken dryck väljas
            var drink_name = payload[n].namn;
            var drink_td = 'drink' + i + 'p';
            
            document.querySelector('#' + drink_td).innerHTML = drink_name;
            
            var drink_id = payload[n].beer_id;
            console.log(drink_id);
            
            //check if non-alcoholic drink and adding a label if so
            checkAlcohol(api, beer_id, i, n);
            
            //adding amount and price for each beverage
            var amount = payload[n].count;
            var price = payload[n].price;
            
            if (amount < 0) {
                document.querySelector('#amount' + i).innerHTML = 'Refill me';
            } else {
                document.querySelector('#amount' + i).innerHTML = amount + ' units';
            }
            
            document.querySelector('#price' + i).innerHTML = price + ':-';
            
        }
        
    });
    
    
    function checkAlcohol(api, beer_id, i, n) {
    
        api.fetchBevType(function(bev){   
        
        // for testing with non-alcoholic: beer_id = 197702
        
        //console.log(bev);
        var json = JSON.parse(bev);
        var payload_type = json.payload;
        //console.log(payload_type);
        //console.log('innan varugrupp ' + n);
        var beer_type = payload_type[0].varugrupp;
                
        var alcFree = 'Alkoholfritt, Övrigt';
        /*console.log(beer_type);
        console.log(alcFree);
        console.log(n);*/
        if (beer_type === alcFree) {
            //console.log(i);
            var node = document.querySelector('#drinktype' + i).innerHTML = 'non-alcoholic';
            }
                
        }, beer_id);
    }
    
    //alert(drinkList);
    for (var i = 0; i < 21; i++) {
        
        drinkList[i] = ;
    }
    
}
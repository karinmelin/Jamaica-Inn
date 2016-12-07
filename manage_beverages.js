function docLoaded(fn) {
    if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function manageBevPageLoaded() {
    chooseDrinks();
}

function chooseDrinks() {
    var api = new APIConnect();
    
    api.setUser('jorass', 'jorass');
    
    //fetch info about the user of choice
    api.fetchIOU(function(usr) {
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var assets = payload[0].assets;
        var name = payload[0].first_name;
        document.querySelector('#assets').innerHTML = assets;
        document.querySelector('#headerName').innerHTML = name;
        
    });
    
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    
    api.fetchBev(function(list) {
        
        var json = JSON.parse(list);
        var payload = json.payload;
        
        for (var i = 1; i < 21; i++) {
            
            var dropDown = document.getElementById("drinkChoice" + i);
        
            for (var i2 = 8; i2 < payload.length; i2++) {
                var option = document.createElement("option");
            
                var drink_name = payload[i2].namn;
                var drink_name2 = payload[i2].namn2;
            
                var node = document.createTextNode(drink_name);
                option.appendChild(node);
                dropDown.appendChild(option);
            }
        }
        
        for (var n = 0; n < 20; n++) {
            n1 = n+1;
            var dropDown = document.getElementById("drinkChoice" + n1);
            var currentDrink = data[n].namn;
            //console.log(currentDrink);
            /*var currentDrinkP = document.getElementById("drink" + i + "p");
            var currentDrink = currentDrinkP.getElementsByTagName('p')[0].innerHTML;*/
            
            var k = 0;
            while (k < payload.length && k > -1) {
                //var drinkInList = dropDown.options[dropDown.selectedIndex].text;
                var drinkInList = dropDown.options[k].text;
                var drinkInListOption = dropDown[k];
                
                console.log(drinkInList);
                console.log(currentDrink);
                console.log(drinkInListOption);
                console.log(dropDown);
                
                if (drinkInList === currentDrink) {
                   dropDown.options.selectedIndex = k; 
                    break;
                } else {
                    k++;
                    i++;
                }
            }
        }
        
        
        
    });
}



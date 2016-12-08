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
            
                var node = document.createTextNode(drink_name + "-" + drink_name2);
                option.appendChild(node);
                dropDown.appendChild(option);
            }
        }
        
        for (var n = 0; n < 20; n++) {
            n1 = n+1;
            var dropDown = document.getElementById("drinkChoice" + n1);
            var currentDrinkName = data[n].namn;
            var currentDrinkName2 = data[n].namn2;
            var currentDrink = currentDrinkName + "-" + currentDrinkName2;
            /*console.log(currentDrink);
            var currentDrinkP = document.getElementById("drink" + i + "p");
            var currentDrink = currentDrinkP.getElementsByTagName('p')[0].innerHTML;*/
            
            var k = 0;
            while (k < payload.length && k > -1) {
                //var drinkInList = dropDown.options[dropDown.selectedIndex].text;
                var drinkInList = dropDown.options[k].text;
                var drinkInListOption = dropDown[k];
                
                /*
                console.log(drinkInList);
                console.log(currentDrink);
                console.log(drinkInListOption);
                console.log(dropDown);*/
                
                if (drinkInList == currentDrink) {
                    dropDown.options.selectedIndex = k; 
                    break;
                } else {
                    k++;
                    i++;
                }
            }
            
            var price = data[n].price;
            var amount = data[n].count;
            
            document.querySelector('#manPrice' + n1).innerHTML = price + ":-";
            document.querySelector('#manAmount' + n1).innerHTML = amount + " units";
        }
        
    });
}

document.addEventListener("change", function(event) {
    
    console.log('inside change event');
    var api = new APIConnect();
    
    //getting thename of the new drink chosen
    var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
    var newDrink = elem.value || elem.options[elem.selectedIndex].value;
    console.log(newDrink);
    
    var newDrink_id = elem.id;
    var id_nrPlus = newDrink_id.substr(newDrink_id.length - 1);
    var id_nr = id_nrPlus - 1;
    
    var drinkList = JSON.parse(localStorage.getItem("drinkList"));
    var data = drinkList.data;
    //console.log(data);
    
    api.fetchBev(function(list) {
        
        var json = JSON.parse(list);
        var payload = json.payload;
    
        //console.log(payload);
        
        //find in payload the drink chosen
        for (var i = 0; i < payload.length; i++) {
            var payload_drink = payload[i].namn + '-' + payload[i].namn2;
            //var data_drink = data[i].namn + '-' + data[i].namn2;
        
            console.log(i);
            console.log(newDrink_id);
            console.log(id_nr);
            if (payload_drink == newDrink) {
                data[id_nr].namn = payload[i].namn;
                data[id_nr].namn2 = payload[i].namn2;
                data[id_nr].sbl_price = payload[i].sbl_price;
                data[id_nr].pub_price = payload[i].pub_price;
                data[id_nr].beer_id = payload[i].beer_id;
                data[id_nr].count = payload[i].count;
                data[id_nr].price = payload[i].price;
                break;
            }
        }
        
        console.log(data);
        localStorage.setItem("drinkList", JSON.stringify(drinkList));
        
    });
});

function changeDrink() {
    
}

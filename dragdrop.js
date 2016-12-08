document.addEventListener("drop", function(event) {
    
    var cart = document.getElementById('shop');
    var drink_id = event.dataTransfer.getData('text');
    
    console.log(drink_id);
    var drink_ptag = document.getElementById(drink_id);
    //drink_ptag.className = "inCart";
    var units = drink_ptag.getElementsByClassName('amount')[0].innerHTML;
    units = parseInt(units);
    if(!isNaN(units)) {
        var price = drink_ptag.getElementsByClassName('price')[0].innerHTML;
        price = parseFloat(price);
        
        var drink_name = drink_ptag.getElementsByTagName('p')[0].innerHTML;
        var inCart = cart.getElementsByClassName('drink_cart');
        var amount = 1;
        
        var itsHere;
        for(var i=0; i<inCart.length; i++) {
            if(inCart[i].innerHTML == drink_name) {
                itsHere = true;
                var cartAmount = cart.getElementsByClassName('amount_cart');
                var cartPrice = cart.getElementsByClassName('price_cart');
                amount += parseInt(cartAmount[i].innerHTML);
                if(amount <= units) {
                    cartAmount[i].innerHTML = amount;
                    cartPrice[i].innerHTML = amount*price;
                }
                break;
            }
        }
        if(!itsHere) {
            var namenode = document.createTextNode(drink_name);
            var amountnode = document.createTextNode(amount);
            var pricenode = document.createTextNode(price);
            var para1 = document.createElement("p"); //Bör p-taggar läggas i div?
            var para2 = document.createElement("p");
            var para3 = document.createElement("p");
            para1.setAttribute('class', 'drink_cart');
            para2.setAttribute('class', 'amount_cart');
            para3.setAttribute('class', 'price_cart');
            para1.appendChild(namenode);
            para2.appendChild(amountnode);
            para3.appendChild(pricenode);
            cart.appendChild(para1);
            cart.appendChild(para2);
            cart.appendChild(para3);
        }
    }
    console.log(drink_name);
});

function allowDrop(allowdropevent) {
    allowdropevent.target.style.color = 'black';
    allowdropevent.preventDefault();
}

function drag(dragevent) {
    dragevent.dataTransfer.setData("text", dragevent.target.id);
    dragevent.target.style.color = 'black';
}

function drop(dropevent) {
	
    dropevent.preventDefault();
    data = dropevent.dataTransfer.getData("text");
    var drinkCopy = document.getElementById(data).cloneNode(true);
    console.log(drinkCopy);
    drinkCopy.className = "inCart";
    
  /*var data=dropevent.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  nodeCopy.id = "drink_in_cart";
  dropevent.target.appendChild(nodeCopy);*/
}

function clearCart() {
    //ClearDrink('drink_in_cart');
    
    /*var drinkCopy = document.getElementsByClassName("inCart");
    /* ----- här ska du få tag i alla med klassen inCart och ta bort dem ---*/
    
    //drinkCopy.remove;
    /*console.log(drinkCopy);
    console.log(drinkCopy[0]);
    while(drinkCopy[0]) {
        drinkCopy[0].parentNode.removeChild(drinkCopy[0]);
        console.log('går in här');
    }*/
    
    document.getElementById("shop").innerHTML = "";
}

/*function clearDrink(elementID) {
    document.getElementById(elementID).innerHTML = "";
}*/
/*  
Script for administrating the drag and drop,
adding drinks to the cart by doubleclick or button
and for the purchase-function.


Author: Nils Hansander & Karin Melin 2016
*/

document.addEventListener("drop", function(event) {
    
    var cart = document.getElementById('shop');
    var drink_id = event.dataTransfer.getData('text');
    
    var drink_ptag = document.getElementById(drink_id);
    
    /*if(!document.getElementById('sum_cart')) {
        var div1 = document.createElement('div');
        div1.setAttribute('id', 'sum_cart');
        cart.appendChild(div1);
    }*/
    
    addToCart(cart, drink_id, drink_ptag);
    
});

/* Function that adds one chosen drink (either dragged and dropped or doubleclicked) 
and adding the name, the current quantity chosen and the price for those drinks into the cart.
The function also calculates and displays the total price of the cart. */
function addToCart(cart, drink_id, drink_ptag) {
    
    var units = drink_ptag.getElementsByClassName('amount')[0].innerHTML;
    units = parseInt(units);
    if(!isNaN(units) && units > 0) {
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
                    cartPrice[i].innerHTML = Number((amount*price).toFixed(1));
                    console.log(cartPrice[i].innerHTML);
                }
                break;
            }
        }
        if(!itsHere) {
            var namenode = document.createTextNode(drink_name);
            var amountnode = document.createTextNode(amount);
            var pricenode = document.createTextNode(price);
            var spacenode1 = document.createTextNode(" ");
            var spacenode2 = document.createTextNode(" ");
            var priceendnode = document.createTextNode(":-");
            
            var addbtn = document.createTextNode("+");
            var subbtn = document.createTextNode("-");
            
            var namepar = document.createElement("p");
            var amntpar = document.createElement("p");
            var pricepar = document.createElement("p");
            var space1 = document.createElement("p");
            var space2 = document.createElement("p");
            var br1 = document.createElement("br");
            var br2 = document.createElement("br");
            var endpar = document.createElement("p");
            
            var btn1 = document.createElement("BUTTON");
            var btn2 = document.createElement("BUTTON");
            
            namepar.setAttribute('class', 'drink_cart');
            amntpar.setAttribute('class', 'amount_cart');
            pricepar.setAttribute('class', 'price_cart');
            
            btn1.setAttribute('type', 'button');
            btn1.setAttribute('class', 'addbtn');
            var strArg1 = 'cartbtn("+", "' + drink_name + '")';
            btn1.setAttribute('onclick', strArg1);
            btn2.setAttribute('type', 'button');
            btn2.setAttribute('class', 'subbtn');
            var strArg2 = 'cartbtn("-", "' + drink_name + '")';
            btn2.setAttribute('onclick', strArg2);
            
            namepar.appendChild(namenode);
            amntpar.appendChild(amountnode);
            pricepar.appendChild(pricenode);
            space1.appendChild(spacenode1);
            space2.appendChild(spacenode2);
            endpar.appendChild(priceendnode);
            
            btn1.appendChild(addbtn);
            btn2.appendChild(subbtn);
            
            cart.appendChild(namepar);
            cart.appendChild(br1);
            cart.appendChild(amntpar);
            cart.appendChild(space1);
            cart.appendChild(btn1);
            cart.appendChild(btn2);
            cart.appendChild(space2);
            cart.appendChild(pricepar);
            cart.appendChild(endpar);
            cart.appendChild(br2);
            
        }
        var prices = cart.getElementsByClassName('price_cart');
        var sum = 0;
        for (i=0; i<prices.length; i++) {
            sum += parseFloat(prices[i].innerHTML);
        }
        var sum_round = Number((sum).toFixed(1));
        document.getElementById('totalamount').innerHTML = "Total: " + sum_round + ":-";
    }
    console.log(drink_name);
}

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

/*Increases or decreases amount, price and sum when +/- buttons in cart are pressed*/
function cartbtn(btn, drink_name) {
    var cart = document.getElementById('shop');
    var inCart = cart.getElementsByClassName('drink_cart');
    var cartAmount = cart.getElementsByClassName('amount_cart');
    var cartPrice = cart.getElementsByClassName('price_cart');
    var drinkList = JSON.parse(localStorage.getItem('drinkList'));
    var drinkData = drinkList.data;
    var nmn, price, units;
    for(var i=0; i<20; i++) {
        nmn = drinkData[i].namn + " " + drinkData[i].namn2;
        if(nmn == drink_name) {
            price = parseFloat(drinkData[i].price);
            units = parseInt(drinkData[i].count);
            break;
        }
    }
    
    var sum = 0;
    for(i=0; i<cartPrice.length; i++) {
        sum += parseFloat(cartPrice[i].innerHTML);
    }
    
    for(var i=0; i<inCart.length; i++) {
        if(inCart[i].innerHTML == drink_name) {
            var amount;
            
            if(btn == "+") {
                amount = parseInt(cartAmount[i].innerHTML) + 1;
                sum += price;
            } else {
                amount = parseInt(cartAmount[i].innerHTML) - 1;
                sum -= price;
            }
            
            if(amount <= 0) {
                var x = inCart[i].nextSibling;
                while(x && (x.getAttribute('class') != 'drink_cart')) {
                    x.parentNode.removeChild(x);
                    x = inCart[i].nextSibling;
                }
                inCart[i].parentNode.removeChild(inCart[i]);
            } else if(amount <= units) {
                cartAmount[i].innerHTML = amount;
                cartPrice[i].innerHTML = Number((amount*price).toFixed(1));
            }
            var sum_round = Number((sum).toFixed(1));
            document.getElementById('totalamount').innerHTML = "Total: " + sum_round + ":-";
            break;
        }
    }
    
}

/* Clears what's currently in the cart by setting all text to nothing */
function clearCart() {
    document.getElementById("shop").innerHTML = "";
    document.getElementById('totalamount').innerHTML = "Total:";
}

/* Decreases the amount of the drinks in the locally stored drinklist.
Is supposed to connect to the API to decrease the balance of
the current user - this is to be fixed!*/
function purchase() {
    var cart = document.getElementById('shop');
    var inCart = cart.getElementsByClassName('drink_cart');
    var cartAmount = cart.getElementsByClassName('amount_cart');
    var prices = cart.getElementsByClassName('price_cart');
    var sum = 0;
    for(i=0; i<prices.length; i++) {
        sum += parseFloat(prices[i].innerHTML);
    }
    
    var drinkList = JSON.parse(localStorage.getItem('drinkList'));
    var drinkData = drinkList.data;
    
    if(sum) {
        for(i=0; i<inCart.length; i++) {
            for(j=0; j<20; j++) {
                var nmn = drinkData[j].namn + " " + drinkData[j].namn2;
                if(inCart[i].innerHTML == nmn) {
                    var drinkCount = drinkData[j].count;
                    var amnt = parseInt(drinkCount);
                    amnt -= parseInt(cartAmount[i].innerHTML);
                    drinkCount = amnt.toString;
                    var k = j+1;
                    document.querySelector('#amount' + k).innerHTML = amnt + ' units';
                    drinkData[j].count -= cartAmount[i].innerHTML;
                    break;
                }
            }
        }
        localStorage.setItem("drinkList", JSON.stringify(drinkList));
        
        // Dra bort sum från balance här
        
        alert("Your purchase has been made!");
        loadDrinks();
        clearCart();
    }
}
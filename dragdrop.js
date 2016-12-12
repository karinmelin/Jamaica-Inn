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
            var spacenode = document.createTextNode(" ")
            var priceendnode = document.createTextNode(":-")
            var para1 = document.createElement("p");
            var para2 = document.createElement("p");
            var para3 = document.createElement("p");
            var para4 = document.createElement("p");
            var para5 = document.createElement("br");
            var para6 = document.createElement("p");
            para1.setAttribute('class', 'drink_cart');
            para2.setAttribute('class', 'amount_cart');
            para3.setAttribute('class', 'price_cart');
            para1.appendChild(namenode);
            para2.appendChild(amountnode);
            para3.appendChild(pricenode);
            para4.appendChild(spacenode); //space
            para6.appendChild(priceendnode);
            cart.appendChild(para1);
            cart.appendChild(para4); //space
            cart.appendChild(para2);
            cart.appendChild(para4); //space
            cart.appendChild(para3);
            cart.appendChild(para6);
            cart.appendChild(para5);
            
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
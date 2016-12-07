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
    
    var drinkCopy = document.getElementsByClassName("inCart");
    /* ----- här ska du få tag i alla med klassen inCart och ta bort dem ---*/
    
    //drinkCopy.remove;
    console.log(drinkCopy);
    console.log(drinkCopy[0]);
    while(drinkCopy[0]) {
        drinkCopy[0].parentNode.removeChild(drinkCopy[0]);
        console.log('går in här');
    }
}

/*function clearDrink(elementID) {

    document.getElementById(elementID).innerHTML = "";
}*/

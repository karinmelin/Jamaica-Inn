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
  var data=dropevent.dataTransfer.getData("text");
  var nodeCopy = document.getElementById(data).cloneNode(true);
  nodeCopy.id = "drink_in_cart";
  dropevent.target.appendChild(nodeCopy);
}

function ClearCart() {

	ClearDrink('drink_in_cart');
}

function ClearDrink(elementID) {

    document.getElementById(elementID).innerHTML = "";
}

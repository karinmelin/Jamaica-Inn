function docLoaded(fn) {
	if (document.readyState !== 'loading') {
        fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function connectToAPI() {
    var api = new APIConnect();
	/*btn = document.getElementById("b1");*/

    api.setUser('jorass', 'jorass');
    /*btn.addEventListener('click', function() { loadUsers(api) });*/

    api.fetchIOU(function(usr) {  
        
        var json = JSON.parse(usr);
        var payload = json.payload;
        
        var name = payload[0].first_name;
        var credit = payload[0].assets;
        
        document.querySelector('.username').innerHTML = name;
        document.querySelector('.credit').innerHTML = credit;
        
    });
}

//---translation---

function dictionary() {
    var dict = {
        sv: {
            
        },
        en: {
            
        }    
    }
    return dict[sessionStorage.getItem('sprak')];
}


function translate() {
    var textElem = document.getElementsByClassName('transl');
    var dict = dictionary();
    
    for(var j=0; j<textElem.length; j++) {
        var x = dict[textElem[j].id];
        
        if(x === undefined) {
            alert(textElem[j].id + " is not in dictionary()");
        }
        else {
            if(textElem[j].nodeName === 'INPUT') {
                if(textElem[j].getAttribute('placeholder')) {
                    textElem[j].setAttribute('placeholder', x);
                }
                else if(textElem[j].getAttribute('value')) {
                    textElem[j].setAttribute('value', x);
                }
            }
            else {
                document.getElementById(textElem[j].id).innerHTML = x;
            }
        }
    }
}


function langSelect() {
    var x = document.getElementById('langChoice').value;
    sessionStorage.setItem('sprak', x);
    translate();
}


function checkLang() {
    if (!sessionStorage.getItem('sprak')) {
        sessionStorage.setItem('sprak', 'en') // Default language
    }
    var x = document.getElementById("langChoice");
    x.addEventListener("change", langSelect);
    document.getElementById(sessionStorage.getItem('sprak')).selected = 'true';
    translate();     
}

//-----------------

function pageLoaded() {
	connectToAPI();
    checkLang();
}
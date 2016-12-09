//---translation---

function dictionary() {
    var dict = {
/*        langTemplate: {
            // translatable elements for admin_addusers.html
            
            // translatable elements for adminallbeverages.html
            
            // translatable elements for adminbeverages.html
            
            // translatable elements for adminhistory.html
            
            // translatable elements for adminusers.html
            
            // translatable elements for allbeverages.html
            
            // translatable elements for history.html
            
            // translatable elements for index.html
            loginHead: '',
            userLabel: '',
            uname: '',
            pswLabel: '',
            psw: '',
            personalButton: '',
            staffButton: ''
        },
*/
        sv: {
            // translatable elements for index.html
            /*
            OBS!---Ej uppdaterade noder, från gammal Master---OBS!
            */
            loginHead: 'Logga in',
            userLabel: '<b>Användarnamn</b>',
            uname: 'Ditt användarnamn',
            pswLabel: '<b>Lösenord</b>',
            psw: 'Ditt lösenord',
            personalButton: 'Logga in som personal',
            staffButton: 'Logga in som admin'
            
            // translatable elements for allbeverages.html
        },
        en: {
            // translatable elements for index.html
            loginHead: 'Log in',
            userLabel: '<b>Username</b>',
            uname: 'Enter Username',
            pswLabel: '<b>Password</b>',
            psw: 'Enter Password',
            personalButton: 'Login as staff',
            staffButton: 'Login as admin'
            
            // translatable elements for allbeverages.html
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
            if(textElem[j].nodeName === 'INPUT') {
                if(textElem[j].getAttribute('placeholder')) {
                    x = textElem[j].getAttribute('placeholder');
                }
                else if(textElem[j].getAttribute('value')) {
                    x = textElem[j].getAttribute('value');
                }
            }
            else {
                x = document.getElementById(textElem[j].id).innerHTML;
            }
            console.log(textElem[j].id + ": '" + x + "'" + ",");
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

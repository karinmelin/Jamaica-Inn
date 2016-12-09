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
            all_beverages: 'Alla drycker',
            previously_bought: 'Tidigare köp',
            manage_users: 'Hantera användare',
            manage_beverages: 'Hantera drycker',
            log_out: 'Logga ut',
            welcome_p: 'Välkommen <span id="headerName"></span>',
            userBalance_p: 'Saldo:  ',
            all_users: 'Alla användare',
            edit_user_balance: 'Redigera användarsaldo',
            edit_user: 'Redigera användare',
            username_p: 'Användarnamn',
            usernameBalance: 'Användarnamn',
            usernameBalance_p: 'Saldo',
            purchase_p: 'För att köpa en dryck, dra och släpp en dryck i kundvagnen',
            beer_cat: 'Öl',
            cider_cat: 'Cider',
            wine_cat: 'Vin',
            non_cat: 'Alkoholfritt',
            Heading_cart: 'Kundvagn',
            totalamount: 'Totalt:',
            purchase_button: 'Köp',
            clear_button: 'Töm kundvagn',
            admin_history: 'Tidigare köp',
            add_users: 'Lägg till användare',
            edit_users: 'Redigera användare',
            edit_balance: 'Redigera användarsaldo',
            edit_slots: 'Redigera tillgängliga drycker',
            edit_stock_price: 'Redigera lager/pris',
            Balance: 'Saldo:  <span id="assets"></span>:-',
            beverage_choose: 'Välj vilka drycker som finns i automaten',
            save_button: 'Spara ändringar',
            to_purchase: 'För att köpa en dryck, dra och släpp en dryck i kundvagnen',
            users_category: 'Användarnamn Förnamn Efternamn Email Telefon',
            first_name: 'Förnamn',
            fname: 'Förnamn', //placeholder
            last_name: 'Efternamn',
            lname: 'Efternamn', //placeholder
            username: 'Användarnamn',
            password: 'Lösenord',
            email: 'Email',
            emailplaceholder:'Email',
            phone: 'Telefonnr',
            phoneplaceholder:'Telefonnr',
            saveuser_button: 'Spara användare',
            beverageh3: 'Drycker',
            bev_category: 'Dryck Pris Antal',
            edit_beverage: 'Redigera dryck',
            beveragetxt: 'Dryck',
            beveragePlaceholder: 'Välj ny dryck',
            quantitytxt: 'Antal',
            quantityPlaceholder: 'Välj nytt antal',
            pricetxt: 'Pris',
            pricePlaceholder: 'Välj nytt pris',
            savebeverage_button: 'Spara dryck',
            
            // translatable elements for allbeverages.html
        },
        en: {
            // translatable elements for index.html
            all_beverages: 'All Beverages',
            previously_bought: 'Previously Bought',
            manage_users: 'Manage Users',
            manage_beverages: 'Manage Beverages',
            log_out: 'Log out',
            welcome_p: 'Welcome  ',
            userBalance_p: 'Balance:  ',
            all_users: 'All users',
            edit_user_balance: ' Edit User Balance',
            edit_user: ' Edit user',
            username_p: 'Username',
            usernameBalance: 'Username',
            usernameBalance_p: 'Balance',
            purchase_p: 'To purchase a beverage, drag and drop a drink into the shopping cart',
            beer_cat: 'Beer',
            cider_cat: 'Cider',
            wine_cat: 'Wine',
            non_cat: 'Non-Alcoholic',
            Heading_cart: 'Shopping cart',
            totalamount: 'Total:',
            purchase_button: ' Purchase ',
            clear_button: ' Clear ',
            admin_history: 'Previously Bought',
            add_users: 'Add Users',
            edit_users: 'Edit Users',
            edit_balance: 'Edit Balance',
            edit_slots: 'Edit Slots',
            edit_stock_price: 'Edit Stock/Price',
            Balance: 'Balance:  <span id="assets"></span>:-',
            beverage_choose: 'Choose which beverages you want in the vending machine',
            save_button: ' Save changes ',
            welcome: '<p id="welcome" class="transl">Welcome <span id="headerName"></span></p>',
            to_purchase: 'To purchase a beverage, drag and drop a drink into the shopping cart',
            users_category: 'Username Firstname Lastname Email Phone',
            first_name: 'First name',
            fname: 'First name', //placeholder
            last_name: 'Last name',
            lname: 'Last name', //placeholder
            username: 'Username',
            password: 'Password',
            email: 'Email',
            emailplaceholder:'Email',
            phone: 'Phone number',
            phoneplaceholder:'Phone number',
            saveuser_button: 'Save user',
            beverageh3: ' Beverages',
            bev_category: 'Beverage Price Quantity',
            edit_beverage: ' Edit Beverage',
            beveragetxt: ' Beverage ',
            beveragePlaceholder: 'Enter the beverage',
            quantitytxt: ' Quantity ',
            quantityPlaceholder: 'Enter a new quantity',
            pricetxt: 'Price',
            pricePlaceholder: 'Enter a new price',
            savebeverage_button: 'Save beverage'
            
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
    var x = document.getElementById('language_choice').value;
    sessionStorage.setItem('sprak', x);
    translate();
}


function checkLang() {
    if (!sessionStorage.getItem('sprak')) {
        sessionStorage.setItem('sprak', 'en') // Default language
    }
    var x = document.getElementById("language_choice");
    x.addEventListener("change", langSelect);
    document.getElementById(sessionStorage.getItem('sprak')).selected = 'true';
    translate();     
}

//-----------------

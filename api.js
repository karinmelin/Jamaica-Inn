function APIConnect() {
    var baseURL = 'http://pub.jamaica-inn.net/fpdb/api.php',
		username = '',
		password = '';
	
	function constructURL(params) { 
        var urlLink = baseURL + '?' + 'username=' + username + '&' + 'password=' + password;
        
        for (var key in params) {
            urlLink = urlLink + '&' + key + '=' + params[key];
        }
        
        /*alert('constructURL:'+urlLink);*/
        return urlLink;
    }
	
	function request(url, callback) {
        var xhr = new XMLHttpRequest();
        /*url = 'http://www.someurl.com?param1=value1&param2=value2';*/
        
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(this.responseText)
                console.log(this.responseText);
            }
        };
        xhr.send();
    }
	
	this.setUser = function(un, pw) {
		username = un;
		password = pw;
	};
    
	this.fetchUsers = function(callback) {
		var url = constructURL({action: 'user_get_all'});
		request(url, callback);
	};
	
	this.fetchIOU = function(callback) {
        var url = constructURL({action: 'iou_get'});
        request(url, callback);
    };
    
    this.fetchAllIOU = function(callback) {
        alert('fetchAllIOU');
        var url = constructURL({action: 'iou_get_all'});
        request(url, callback);
    };
    
    this.fetchBev = function(callback) {
        var url = constructURL({action: 'inventory_get'});
        request(url, callback);
    };
    
    this.fetchBevType = function(callback, beer_nr) {
        var url = constructURL({action: 'beer_data_get', beer_id: beer_nr});
        request(url, callback);
    }
    
    this.fetchPrevDrinks = function(callback) {
        var url = constructURL({action: 'purchases_get'});
        request(url, callback);
    };
	
	this.setNewUser = function(callback, new_username, new_password, first_name, last_name, email, phone) {
		var url = constructURL({action: 'user_edit', new_username: new_username, new_password: new_password, first_name: first_name, last_name: last_name, email: email, phone: phone});
		request(url, callback);
		alert(url);
	};
}
   


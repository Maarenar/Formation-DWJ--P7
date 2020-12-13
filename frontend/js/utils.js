/**
 * @param {String} el
 * @returns {String}  
 */
function oid(el) {
    const ez = document.getElementById(el);
    if(!ez) console.log(el+" not found");
    return ez;
}

/**
 *
 * @param {String} el
 * @returns {HTMLElement}
 */
function make(el){
    return document.createElement(el);
}

/**
 * 
 * @param {String} method 
 * @param {String} url 
 * @param {Function} callback 
 * @param {JSON} data 
 */
function apiCall(method, url, callback, data){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest(); //objet
    
    request.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && [200, 201].indexOf(this.status) !== false){
            callback(JSON.parse(this.responseText, this.status));
        }
    };
    // Open a new connection, using the GET request on the URL endpoint
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/json");
    if(method == 'POST'){
        request.send(JSON.stringify(data));
    }else{
        request.send();
    }
}


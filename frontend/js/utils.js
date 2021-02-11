

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
 * @param {string} method 
 * @param {string} url 
 * @param {callback} callback
 */
function request(method, url, callback, data){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && [200, 201].indexOf(this.status) !== false) {
                callback(JSON.parse(this.responseText));  
            }
        }
    xhttp.open(method, url);
    //xhttp.setRequestHeader("Authorization", 'Bearer'+ token);
    if(method =='POST'){
        xhttp.send(JSON.stringify(data));
    }else{
        xhttp.send();
    } 
};

async function requestFetch(method, url, callback, data){

    var myRequest = {   
        method: method,
        headers: {
            'Accept' : "application/json",
            "Content-type" : "application/json"
        },
        mode: 'cors',
        cache: 'default',
        body :  JSON.stringify(data)};
    
    const response = await fetch(url,myRequest);
    callback(await response.json());
}






 
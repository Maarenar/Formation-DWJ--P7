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
 */
function request(method, url){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && [200, 201].indexOf(this.status) !== false) {
                let response = (JSON.parse(this.responseText));
                return response;
            }
        }
    xhttp.open(method, url, true);
    xhttp.send();
};


 
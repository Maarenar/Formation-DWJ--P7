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

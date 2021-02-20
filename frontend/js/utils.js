

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
 * @param {*} method 
 * @param {*} url 
 * @param {*} callback 
 * @param {*} data 
 */

async function request(method, url, callback, data){

    let token;

    if(localStorage.getItem('token')){
        token = (localStorage.getItem('token'));
    }
    
    var myRequest = {   
        method: method,
        headers: {
            'Accept' : "application/json",
            "Content-type" : "application/json",
            "Authorization" : token ? token : '',
        },
        mode: 'cors',
        cache: 'default',
        body :  JSON.stringify(data)};
    
    const response = await fetch(url,myRequest);
    callback(await response.json());
}


/**
 * FONCTION POUR BLOQUER L'ACCÈS SI L'UTILISATEUR N'EST PAS CONNECTÉ
 */
function checkLogginProfile() {
    
    let user_id = localStorage.getItem('userId');

    if(user_id == null){
        let notLoggedContainer = make('div');
        notLoggedContainer.className = 'modale';

        let notLoggedDiv = make('div');

        let notLogged = make('h2');
        notLogged.className = 'disclaimer';
        notLogged.innerText = "Hey ! Il faut vous connecter d'abord !";

        let notLoggedLink = make('a');
        notLoggedLink.innerText = 'Retourner à l\'accueil';
        notLoggedLink.href = 'http://localhost:8888/site/frontend/';

        notLoggedDiv.append(notLogged, notLoggedLink);
        notLoggedContainer.append(notLoggedDiv);
        document.body.appendChild(notLoggedContainer);
    }
    
}

/**
 * FONCTION POUR BLOQUER L'ACCÈS SI L'UTILISATEUR N'EST PAS CONNECTÉ
 */
function checkLogginUserPage() {
    
    let user_id = localStorage.getItem('userId');

    if(user_id == '' || user_id == null){

        let notLoggedContainer = make('div');
        notLoggedContainer.className = 'modale';

        let notLoggedDiv = make('div');

        let notLogged = make('h2');
        notLogged.className = 'disclaimer';
        notLogged.innerText = "Hey ! Il faut vous connecter d'abord !";

        let notLoggedLink = make('a');
        notLoggedLink.innerText = 'Retourner à l\'accueil';
        notLoggedLink.href = 'http://localhost:8888/site/frontend/';

        notLoggedDiv.append(notLogged, notLoggedLink);
        notLoggedContainer.append(notLoggedDiv);
        document.body.appendChild(notLoggedContainer);
    } 
}

/**
 * CRÉATION D'UN MESSAGE POUR AFFICHER LA REPONSE DU SERVEUR
 */

 function showAlert(message) {
     let alertContainer = make('div');
     let alertMessage = make('p');
     alertMessage.innerText = message;

     alertContainer.append(alertMessage);
     document.body.appendChild(alertContainer);
 }







 
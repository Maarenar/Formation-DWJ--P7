/*function userLogIn(){
    //Get user login infos
    let userFormData = document.getElementsById('login-form');
    let existingUser = {
        email       : userFormData[0].value,
        password    : userFormData[1].value
    }

    //Send user login infos
    request('POST', 'https://localhost:3000/api/login', function(response) {
        console.log("resp",response);
    }, 
    existingUser);

    window.open('./account/id');//l'id sera recupéré grâce à la réponse du serveur : response.id
}

function userSignin() {
    //Get user signin infos
    let userFormData = document.getElementById('signin-form');
    let newUser = {
        lastname    : userFormData[0].value,
        firstname   : userFormData[1].value,
        email       : userFormData[2].value,
        password    : userFormData[3].value,
        department  : userFormData[4].value,
    }

    //Send user signin infos
    request('POST', 'https://localhost:3000/api/signup', function(response) {
        console.log("resp",response);
    }, 
    newUser);

    window.open('./account/id');//l'id sera récuperé grâce à la réponse du serveur : response.id
}*/
//OUVRE LE FORMULAIRE DE CONNEXIOB
function openLoginForm(){
    document.getElementById('login-form').classList.toggle('login-form-show');
}

//OUVRE LE FORMULAIRE D'INSCRIPTION
function openSigninForm(){
    document.getElementById('signin-form').classList.toggle('signin-form-show');
}

//MONTRE/CACHE LE MOT DE PASSE SUR LE FORMULAIRE D'INSCRIPTION
function showPassword(){
   let pswdInput = document.getElementById("pswd-input");
    if (pswdInput.type === "password") {
        pswdInput.type = "text";
    } else {
        pswdInput.type = "password";
    }
}

//AFFICHE LE MESSAGE D'ENVOI DU NOUVEAU MOT DE PASSE
function confirmationNewPswd() {
    document.getElementById('message-new-pswd').textContent = 'Un email vous a été envoyé';
    document.getElementById('form-new-pswd').style.display = 'none';
}


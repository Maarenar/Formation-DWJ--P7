
window.addEventListener("load", ()=>{
    function login(email,password){
        requestFetch('POST', "http://localhost:3000/api/users/login/",function(answer){
            localStorage.setItem("blabla","bloublou");
        /*let storedToken = JSON.stringify(answer.token); 
        console.log(storedToken);
        localStorage.setItem('token', 'blabla');*/
        //window.location.replace("http://localhost:8888/site/frontend/account.html");
        },{
            email       : email,
            password    : password
        })
    }

    function signup(email, password, firstname, lastname, department) {
        request('POST', "http://localhost:3000/api/users/signup/", function () {
            //store response userId + token;
            //window.location.replace("http://localhost:8888/site/frontend/account.html");
        },{
            email       : email,
            password    : password,
            firstname   : firstname,
            lastname    : lastname,
            department  : department,
        })
    }

    oid('login-btn').addEventListener("click", () => {
        let email = oid('email').value;
        let password = oid('password').value;
        login(email,password);
    })

    oid('signup-btn').addEventListener("click", () => {
        let email       = oid('email-signup').value;
        let paswword    = oid('password-signup').value;
        let firstname   = oid('firstname').value;
        let lastname    = oid('lastname').value;
        let department  = oid('department').value;
        signup(email, password, firstname, lastname, department);
    })

})


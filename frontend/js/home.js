window.addEventListener("load", ()=>{

    function login(email,password){
        localStorage.clear();
        request('POST', "http://localhost:3000/api/users/login/",function(answer){
        if(answer.error){
            alert(answer.error);
        } else {
            localStorage.setItem('token',answer.token);
            localStorage.setItem('userId', answer.userId);
            localStorage.setItem('admin', answer.admin);
            window.location.replace("http://localhost:8888/site/frontend/account.html");
        }
        },{
            email       : email,
            password    : password
        })
    }

    oid('login-btn').addEventListener("click", () => {
        let email = oid('email').value;
        let password = oid('password').value;
        login(email,password);
    })

    function signup(email, password, firstname, lastname, department) {
        console.log(email);
        localStorage.clear();
        request('POST', "http://localhost:3000/api/users/signup/", function (data) {
            console.log(data);
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId', data.userId);
        window.location.replace("http://localhost:8888/site/frontend/account.html");
        },{
            email       : email,
            password    : password,
            firstname   : firstname,
            lastname    : lastname,
            department  : department,
        })
    }

   

    oid('signup-btn').addEventListener("click", () => {
        let email       = oid('email-signup').value;
        let password    = oid('password-signup').value;
        let firstname   = oid('firstname').value;
        let lastname    = oid('lastname').value;
        let department  = oid('department').value;
        signup(email, password, firstname, lastname, department);
    })

})


window.addEventListener("load", () =>{

    function userSignup(lastname, firstname, email, password, department) {
        apiCall('POST', "localhost:3000/api/signup", {
            lastname    : lastname,
            firstname   : firstname,
            email       : email,
            password    : password,
            department  : department
        })
        .then(data => {
            alert(data);
            //rediriger vers account.html avec l'id de l'utilisateur
        }).catch(err => {
            alert(err);
        });
    };

    oid('signup-btn').addEventListener("click", (e) => {
        e.preventDefault();
        let lastname    = oid('lastname').value     ;
        let firstname   = oid('firstname').value    ;
        let email       = oid('email').value        ;
        let password    = oid('password').value     ;
        let department  = oid('department').value   ;

        userSignup(lastname, firstname,email,password,department);
    });

});
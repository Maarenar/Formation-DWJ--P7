window.addEventListener("load", () =>{

    function userSignup(lastname, firstname, email, password, department) {
        apiCall('POST', "localhost:3000/api/signup", {
            lastname    : lastname,
            firstname   : firstname,
            email       : email,
            password    : password,
            department  : department
        });
         console.log('yo');
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
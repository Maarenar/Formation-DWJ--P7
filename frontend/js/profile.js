window.addEventListener("load", () => {
    let user_id = localStorage.getItem('userId');
    let admin = localStorage.getItem('admin');

    checkLogginProfile();

    /**
     * RECUPERATION DES INFOS DU USER
     */
    request("POST", "http://localhost:3000/api/users/profile/", function(userInfos) {
        editUserInfos(userInfos);
    },
    {
        userId : user_id
    });

    function editUserProfile(firstname, lastname, email, department, password) {
        request("PUT", "http://localhost:3000/api/users/", function (response) {
            alert(response);
        },{
            email       : email,
            lastname    : lastname,
            firstname   : firstname,
            department  : department,
            password    : password,
            userId      : user_id
        })
    };
    
     

    /**
     * DISPLAY EDITABLE USER'S DETAILS
     */
    function editUserInfos(userInfos) {

        let userFirstName = oid('edit-firstname');
        userFirstName.value = userInfos.firstname;
        let userLastName = oid('edit-lastname');
        userLastName.value = userInfos.lastname
        let userEmail = oid('edit-email');
        userEmail.value = userInfos.email;
        let userDepartment = oid('edit-department');
        userDepartment.value = userInfos.department ? userInfos.department : '';
        userDepartment.placeholder = 'Vous n\avez pas renseigne de departement';
    }

    oid('save-infos').addEventListener("click", () => {
        let newFirstname    = oid('edit-firstname').value;
        let newLastname     = oid('edit-lastname').value;
        let newEmail        = oid('edit-email').value;
        let newPasword      = oid('edit-password').value;
        let newDepartment   = oid('edit-department').value;
        editUserProfile(newFirstname, newLastname, newEmail, newDepartment, newPasword);
    })

})

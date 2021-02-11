window.addEventListener("load", () => {
    let feed = oid('feed');

    request("GET", "http://localhost:3000/api/posts/", function(publications){
        displayPost(publications);
    });

    request("GET", "http://localhost:3000/api/users/profile/5", function(userInfos) {
        displayUserInfos(userInfos);
    });

    function publish() {
        request("POST", "http://localhost:3000/api/posts/", function() {
            alert("C'est envoyé !")
        })
    }

    function modifyPost() {
        request("PUT", "http://localhost:3000/api/posts/", function() {
            alert("C'est fait !")
        })
    }

    function deletePost() {
        request("DELETE", "http://localhost:3000/api/posts/", function() {
            alert("C'est fait !")
        })
    }

    function comment() {
        request("POST", "http://localhost:3000/api/posts/", function () {
           alert("C'est envoyé !") 
        } )
    }

    function modifyComment(params) {
        request("PUT", "http://localhost:3000/api/comments/", function() {
            alert("C'est fait !")
        })
    }

    function deleteComment(params) {
        request("DELETE", "http://localhost:3000/api/comments/", function() {
            alert("C'est fait !")
        })
    }

    function modifyInfos() {
        request("PUT", "http://localhost:3000/api/users/", function() {
            alert("C'est fait !")
        })
    }

    function modifyPassword() {
        request("PUT", "http://localhost:3000/api/users/pswd", function() {
            alert("C'est fait !")
        })
    }

        
    /**
     * BUILD A CONTAINER FOR EACH POST AND ADDS ITS DATA IN IT
     */



    function displayPost(publications) {
        if(publications[0] != null){
            let postToDisplay = publications[0];

            postToDisplay.forEach(post => {

                //ON RECUPERE LE NOM DE L'AUTEUR DU POST
                let auteur = post.author[0];
                let firstname = auteur.firstname;
                let lastname = auteur.lastname;
                let fullname = firstname + ' ' + lastname;

                //ON RECUPERE LE CONTENU DU POST
                let postContent = post.content;
            
                //ON RECUPERE LES COMMENTAIRES
                let comments = post.comments;

                let commsContainer = make('div');
                commsContainer.className = 'post-coms';

                comments.forEach(comment => {
                    // ON RECUPERE LE CONTENU DU COMMENTAIRE
                    let content = comment.content;
                    //ON RECUPERE L'AUTEUR ET ON RETOURNE SON NOM COMPLET
                    let comAuteur = comment.author[0];
                    let comAuteurFirst = comAuteur.firstname;
                    let comAuteurLast = comAuteur.lastname;
                    let comFullname = comAuteurFirst + ' ' + comAuteurLast;

                    let singleComContainer = make('div');
                    let comAuthorName = make('p');
                    comAuthorName.className = 'com-author';
                    comAuthorName.innerText = comFullname;
                    let comContent = make ('p');
                    comContent.className = 'com-content';
                    comContent.innerText = content;

                    singleComContainer.append(comAuthorName,comContent);
                    if(singleComContainer != ''){
                        commsContainer.append(singleComContainer);
                    } else {
                        commsContainer.append('<p>Aucun commentaire</p>');
                    }
                    
                });

            
                let postContainer = make('div');
                postContainer.className = 'post-container';

                let authorContent = make('div');
                authorContent.className = 'author-content';

                let authorName = make('p');
                authorName.className = 'author-name';
                authorName.innerText = fullname;

                let authorPub = make('p');
                authorPub.innerText = 'a publié';

                authorContent.append(authorName,authorPub);

                let postFullContent = make('p');
                postFullContent.className = 'post-content';
                postFullContent.innerText = "« " + `${postContent}` + " »";

                postContainer.append(authorContent, postFullContent, commsContainer);
                feed.append(postContainer);
                
            })

        } else {
            let emptyFeed = make('h2');
            emptyFeed.innerText = "Aucune publication";
            feed.append(emptyFeed);
        }
    }

    /**
     * DISPLAYS USER'S DETAILS
     */

    function displayUserInfos(userInfos) {
        let userName = oid('user-name');
        userName.innerText = userInfos.name;
        let userEmail = oid('user-email');
        userEmail.innerText = userInfos.email;
        let userDepartment = oid('user-department');
        userDepartment.innerText = userInfos.department ? userInfos.department : 'Vous n\'avez pas renseigné votre fonction';
    }

})
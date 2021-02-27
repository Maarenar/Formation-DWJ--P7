window.addEventListener("load", () => {
    let user_id = parseInt(localStorage.getItem('userId'));
    let admin   = parseInt(localStorage.getItem('admin'));

    checkLogginUserPage();

    /**
     * RECUPERATION DES POSTS
     */
    request("GET", "http://localhost:3000/api/posts/", function(publications){
        displayPost(publications);   
    });

    /**
     * RECUPERATION DES INFOS DU USER
     */
    request("POST", "http://localhost:3000/api/users/profile/", function(userInfos) {
        displayUserInfos(userInfos);
    },
    {
        userId : user_id
    });

    /**
     * FONCTION POUR PUBLIER UN POST
     * @param {*} postContent 
     * @param {*} userId 
     */

    function publish(postContent, userId) {
        request("POST", "http://localhost:3000/api/posts/", function(answer) {
        alert(answer);    
        window.location.reload;
        }, 
        {
            content : postContent,
            userId : userId,
            date : new Date().getTime(),
        })
    }

    oid('post-submit').addEventListener("click", () => {
        let postContent = oid('post-content').value;
        let userId = user_id;
        publish(postContent, userId);
    })

     /**
     * FONCTION POUR SUPPRIMER UN POST
     */
    function deletePost(postid, userId) {
        request("DELETE", "http://localhost:3000/api/posts/", function(answer) {
            alert(answer);
        },{
            postId : postid,
            userId : userId,
        })
    }


    /**
     * FONCTION POUR COMMENTER UN POST
     */
    function comment(content, postId, user_id) {
        request("POST", "http://localhost:3000/api/comments/", function (answer) {
           alert("OK"); 
        },{
            content : content,
            userId  : user_id,
            postId  : postId,
            date    : new Date().getTime()
        })
    }

    /**
     * FONCTION POUR SUPPRIMER UN COMMENTAIRE
     * @param {*} params 
     */
    function deleteComment(commentId, user_id) {
        request("DELETE", "http://localhost:3000/api/comments/", function() {
            alert("C'est fait !")
        },{
            commentId : commentId,
            userId : user_id
        })
    }
        
    /**
     * BUILD A CONTAINER FOR EACH POST AND ADDS THE DATA RECEIVED IN IT
     */

    function displayPost(publications) {
        if(publications[0] != ''){
            let postToDisplay = publications[0];

            postToDisplay.forEach(post => {

                //ON RECUPERE LE NOM DE L'AUTEUR DU POST ET SON ID
                let auteur = post.author[0];
                let firstname;
                let lastname;
                let fullname;
                if(auteur === undefined ){
                    fullname = 'Utilisateur supprimé' 
                } else {
                    firstname = auteur.firstname;
                    lastname = auteur.lastname;
                    fullname = firstname + ' ' + lastname;
                }
                
                let userId = post.userId;

                //ON RECUPERE LE CONTENU DU POST
                let postContent = post.content;
            
                //ON RECUPERE LES COMMENTAIRES
                let comments = post.comments;

                let commsContainer = make('div');
                commsContainer.className = 'post-coms';

                if(comments.length !== 0){
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

                        let comDate = new Date(comment.date);
                        let formattedComDate = 'Le ' + comDate.getDate() + '/' + (comDate.getMonth()+1) + '/' + comDate.getFullYear() + ' - ' + comDate.getHours() + ':' + comDate.getMinutes() ;
                        
                        let deleteComButton = make('button');
                        deleteComButton.className = 'btn small deleteCom'
                        deleteComButton.innerText = 'Supprimer'
                        deleteComButton.addEventListener("click", () => {
                            deleteComment(comment.commentid, user_id);
                        }) 

                        if(user_id == comment.userId || admin == 1){
                            singleComContainer.append(formattedComDate, deleteComButton, comAuthorName,comContent);
                        } else {
                            singleComContainer.append(formattedComDate, comAuthorName,comContent);
                        }

                        commsContainer.append(singleComContainer);
                    });
                } else {
                    commsContainer.append('Aucun commentaire');
                }
                  
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

                let deleteBtn = make('button');
                deleteBtn.className = 'btn small deleteBtn';
                deleteBtn.innerText = 'Supprimer';
                deleteBtn.addEventListener("click", () => {
                    deletePost(post.postId, user_id, admin);
                })

                let commenting = make('input');
                commenting.className = 'add-comment input';
                commenting.placeholder = 'Ajouter un commentaire';
                commenting.addEventListener("keypress", function(e) {
                    if (e.key === 'Enter') {
                        comment(commenting.value, post.postId, user_id);
                      }
                })


                let userIdContainer = userId;

                if (userIdContainer === user_id || admin === 1){
                    postContainer.append(deleteBtn);
                }

                postContainer.append(authorContent, postFullContent, commenting, commsContainer);
                feed.append(postContainer);
                
            })

        } else {
            let emptyFeed = make('h2');
            emptyFeed.className = 'disclaimer';
            emptyFeed.innerText = "Aucune publication";
            feed.append(emptyFeed);
        }
    }

    /**
     * DISPLAY USER'S DETAILS
     */

    function displayUserInfos(userInfos) {
        let userName = oid('user-name');
        userName.innerText = userInfos.firstname + ' ' + userInfos.lastname;
        let userEmail = oid('user-email');
        userEmail.innerText = userInfos.email;
        let userDepartment = oid('user-department');
        userDepartment.innerText = userInfos.department ;
    }

    oid('logout').addEventListener("click", () =>{
        localStorage.clear();
        window.location.replace('http://localhost:8888/site/frontend/');
    })

})


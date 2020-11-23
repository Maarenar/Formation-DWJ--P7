/*//RÉCUPÈRE LES DONNÉES UTILISATEUR ET UTILISE LA FONCTION POUR LES AFFICHER
apiCall('GET', 'https://localhost:3000/:1', function() {
    console.log(data);
    //displayUserInfo();//on reçoit un objet avec les données de l'utilisateur
});

//ASSEMBLE LE NOM ET LE PRÉNOM

function createName(userInfo){
    let firstname   = userInfo.firstname;
    let lastname    = userInfo.lastname
    return `{$firstname}` + `{$lastname}`;
}

//AFFICHE LES DONNÉES UTILISATEUR

function displayUserInfo(userInfo) {
    let profilePic = document.getElementById('profile-pic');
    let userName = document.getElementById('user-name');
    let userEmail = document.getElementById('user-email');
    let userDepartment = document.getElementById('user-department');

    profilePic.src = './assets/img/profile-pic.jpg';
    userName.innerText = 'Marion Renard';//createName();
    userEmail.innerText = 'mrenard@gmail.com'//userInfo.email;
    userDepartment.innerText = 'IT'//userInfo.department;
}

//RECUPERE LES POSTS ET COMMENTAIRES
request('GET', 'https://localhost:3000/api/posts/', function(postInfos) {
    displayComs();//on reçoit un objet avec les données de l'utilisateur
});*/

//AFFICHE LES POSTS
function displayPost() {
    //for (let i in postInfos){
        //container du post
        let postContainer = document.createElement('div');
            postContainer.className = 'post-container';

            //auteur du post
            let authorContent = document.createElement('div');
                authorContent.className = 'author-content';
            let authorName = document.createElement('p');
                authorName.innerText = 'Marion Renard'//createName();
                authorName.className = 'author-name';
            let authorSentence = document.createElement('p');
                authorSentence.innerText = 'à publié';

            authorContent.append(authorName, authorSentence);

            //contenu du post
            let postContent = document.createElement('div');
                postContent.className = 'post-content'
            let postText = document.createElement('p');
                postText.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

            postContent.append(postText);

            //liking and commenting container
            let likesAndComContainer = document.createElement('div');
                likesAndComContainer.className = 'liking-and-commenting';

                //liking
                let liking = document.createElement('div');
                    liking.className = 'liking';
                    liking.innerHTML = "<p class='far'>&#xf164</p>";
                let likesNumber = document.createElement('p');
                    likesNumber.className = 'likes-number';
                    likesNumber.innerText = '12';

                liking.append(likesNumber);

                //commenting
                let commenting = document.createElement('p');
                    commenting.className = 'commenting';
                    commenting.innerHTML = "<p class='far'>&#xf075</p>";

            likesAndComContainer.append(liking,commenting);
            
            //post comments container
            let postComsContainer = document.createElement('div');
                postComsContainer.className = 'post-coms';
                //display more coms button
                let comsNumberContainer = document.createElement('div');
                let comsNumber = document.createElement('span');
                    comsNumber.innerText = '7';
                    comsNumber.className = 'coms-number';
                let comsNumberText = document.createElement('p');
                    comsNumberText.innerText = 'commentaires';

                comsNumberContainer.append(comsNumber,comsNumberText);

                //2 first posts displayed
                //for (i in postInfos.comments limit 2){
                let comDisplayed = document.createElement('p');
                    comDisplayed.className = 'com-displayed'
                let comDisplayedAuthor = document.createElement('span');
                    comDisplayedAuthor.innerText = 'Marion Renard ';//createName()
                    comDisplayedAuthor.className = 'com-author'
                let comDisplayedContent = document.createElement('span');
                    comDisplayedContent.innerText = ' bla bli bla bla bla ';
                    comDisplayedContent.className = 'com-content';
                let comDisplayedSeeMore = document.createElement('span');
                    comDisplayedSeeMore.innerText = ' ...';
                    comDisplayedSeeMore.className = 'see-more';

                comDisplayed.append(comDisplayedAuthor, comDisplayedContent, comDisplayedSeeMore);

            postComsContainer.append(comsNumberContainer, comDisplayed);

        postContainer.append(authorContent,postContent,likesAndComContainer,postComsContainer);

    document.getElementById('feed').appendChild(postContainer);
    //}
}

displayPost();
displayPost();
displayPost();
displayPost();
displayPost();

//AJOUTER/RETIRER UN LIKE AU POST

//COMMENTER LE POST

//AFFICHER TOUS LES COMMENTAIRES

//AFFICHER LA SUITE D'UN COMMENTAIRE LONG



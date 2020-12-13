/*apiCall('GET','http://localhost:3000/api/:userId', function(userInfo){ //le userId est transmis dans l'url par la fonction signup ou login
    displayUserInfo(userInfo);
});*/

/*//FONCTION POUR AFFICHER LES DONNÉES UTILISATEUR
function displayUserInfo(userInfo) {
    //let profilePic = document.getElementById('profile-pic');
    let userName = document.getElementById('user-name');
    let userEmail = document.getElementById('user-email');
    let userDepartment = document.getElementById('user-department');

    //profilePic.src = './assets/img/profile-pic.jpg'; 
    userName.innerText = `${userInfo.firstname}` + ' ' + `${userInfo.lastname}`;//createName();
    userEmail.innerText = `${userInfo.email}`;//userInfo.email;
    userDepartment.innerText = `${userInfo.department}`//userInfo.department;
}*/

/*//FONCTION CREATION D'UN BLOCK POST
function displayPost(postInfos) {
    //container du post
    let postContainer = document.createElement('div');
        postContainer.className = 'post-container';

        //auteur du post
        let authorContent = document.createElement('div');
            authorContent.className = 'author-content';
        let authorName = document.createElement('p');
            authorName.innerText = `${postInfos.userId}`;
            authorName.className = 'author-name';
        let authorSentence = document.createElement('p');
            authorSentence.innerText = 'à publié';

        authorContent.append(authorName, authorSentence);

        //contenu du post
        let postContent = document.createElement('div');
            postContent.className = 'post-content'
        let postText = document.createElement('p');
            postText.innerText = `${postInfos.content}`;

        postContent.append(postText);

    postContainer.append(authorContent,postContent);

document.getElementById('feed').appendChild(postContainer);
}*/



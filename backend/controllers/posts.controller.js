const Post = require('../models/Posts.models');
const User = require('../models/Users.model');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getAllPosts = (req, res, next) => {
  let response = [];
  Post.getAll()
  .then((posts) => Promise.all(posts.map(async post => {
    console.log(post);
      let formatedPost = {};
      formatedPost.content  = post.content;
      formatedPost.userId   = post.userId;
      formatedPost.postId   = post.postId;
      formatedPost.author   = await Post.getAuthor(post.userId);
      
      formatedPost.comments = await Post.getComments(post.postId)
      .then((comments) => Promise.all(comments.map(async comment => {
        let formatedComment = {};
        formatedComment.commentid = comment.commentId
        formatedComment.content = comment.content;
        formatedComment.date = new Date(comment.date);
        formatedComment.author = await Post.getCommentAuthor(comment.commentId);
        return formatedComment;
      })))
      
      console.log(formatedPost);
      return formatedPost;
    }))
    .then(formatedPost => {
      response.push(formatedPost);
      return response;
    })
  )
  .then(response => {
    return res.status(201).json(response);
  })
  .catch(error => res.status(500).json({ error }));
}


//CRÉER UN POST
exports.createPost = (req,res,next) =>{
  let content = req.body.content;
  let userId  = req.body.userId;
  let date    = req.body.date ? req.body.date : null;
  const newPost = new Post({
    content : content,
    userId : userId,
    date : date
  });
  Post.createPost(newPost)
  .then(response => {
   return res.status(201).json("Post publié ! ");
  })
  .catch(error => res.status(500).json({ error : 'Erreur du serveur'}));

}

//EDITER UN POST
exports.modifyPost = (req,res,next) => {
  let post_id = req.body.postId;
  let content = req.body.content;
  let user_id = req.body.userId;
  Post.findOneById(postId)
  .then(post => {
    if (post.userId = user_id){
      Post.modifyPost([postId, content])
      .then(response => {
        return res.status(201).json("Post modifié ! ");
      })
      .catch(error => res.status(500).json({ error : 'Erreur du serveur'}));
    } else {
      return res.status(401).json("Action non autorisée ! ");
    }
  })
  .catch(error => res.status(500).json({ error : 'Post introuvable'}))
}

//SUPPRIME UN POST
exports.deletePost = (req, res, next) => {
  let postId = req.body.postId;
  let user_id = req.body.userId;
  Post.getOnePost(postId)
  .then(post => {
    let userPost = post[0].userId;
    User.findOneById(user_id)
    .then(user => {
      let adminStatus = user[0].admin;
      if(userPost  == user_id || adminStatus == 1){
        Post.deletePost(postId)
        .then(response => {
          return res.status(201).json("Post supprimé ! ");
        })
        .catch(error => res.status(500).json({ error : 'Erreur du serveur !'}))
      } else {
        return res.status(401).json("Non autorisé");
      }
    })
    .catch(error => res.status(500).json({ error : 'Utilisateur introuvable !'}))
    })
  .catch(error => res.status(500).json({ error : 'Post introuvable !'}))
}

 
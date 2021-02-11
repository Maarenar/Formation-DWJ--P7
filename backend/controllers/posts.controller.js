const Post = require('../models/Posts.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getAllPosts = (req, res, next) => {
  let response = [];
  Post.getAll()
  .then((posts) => Promise.all(posts.map(async post => {
      let formatedPost = {};
      formatedPost.content = post.content;
      formatedPost.author = await Post.getAuthor(post.userId);
      
      formatedPost.comments = await Post.getComments(post.postId)
      .then((comments) => Promise.all(comments.map(async comment => {
        let formatedComment = {};
        formatedComment.content = comment.content;
        formatedComment.author = await Post.getCommentAuthor(comment.commentId);
        return formatedComment;
      })))
      
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
  let date    = req.body.date ? req.body.date : 0;
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
  let postId = req.body.postId;
  let content = req.body.content;
  Post.modifyPost([postId, content])
  .then(response => {
    return res.status(201).json("Post modifié ! ");
  })
  .catch(error => res.status(500).json({ error : 'Erreur du serveur'}));
}

//SUPPRIME UN POST
exports.deletePost = (req, res, next) => {
  let postId = req.body.postId;
  Post.deletePost(postId)
  .then(response => {
    return res.status(200).json("Post supprimé");
  })
  .catch(error => res.status(500).json({ error : 'Erreur du serveur'}));
}
 
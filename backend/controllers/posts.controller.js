const Post = require('../models/Posts.models');

//AFFICHER UN POST AVEC : NOM ET PRENOM DE L'AUTEUR, CONTENU DU POST, COMMENTAIRE : CONTENU + NOM ET PRENOM DE L'AUTEUR
exports.getAllPosts = (req, res, next) =>{
  Post.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      data.forEach(element =>{
        let postContent = element.content;
        console.log("contenu du post : ", postContent);
        let userId = element.userId;
        let postId = element.postId;
        Post.getAuthor(userId, (err,data) => {
          if (err){
            console.log(err);
          } else {
            let author = JSON.stringify(data);
            console.log("auteur du post : ", author);
          }
        });
        Post.getComments(postId, (err,data)=>{
          if(err){
            console.log(err);
          } else {
            let commentContent = element.content;
            console.log("contenu du commentaire", commentContent);
            data.forEach(element =>{
              let commentId = element.commentId;
              Post.getCommentAuthor(commentId, (err, data)=>{
                if(err){
                  console.log(err);
                } else {
                  let commAuthor = JSON.stringify(data);
                  console.log("auteur du com : ", commAuthor);
                }
              })
            });
          }
        })
      });
    }
  });
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
  Post.createPost(newPost, (err,data)=>{
    if(err){
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      return res.status(201).json({"Post publié ! " : data});
    }
  })
}

//EDITER UN POST
exports.modifyPost = (req,res,next) => {
  let postId = req.body.postId;
  let content = req.body.content;
  Post.modifyPost([postId, content], (err,data) => {
    if(err){
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      return res.status(201).json({"Post modifié ! " : data});
    }
  })
}

//SUPPRIME UN POST
exports.deletePost = (req, res, next) => {
  let postId = req.body.postId;
  Post.deletePost(postId, (err, data) =>{
    if(err){
      console.log(err);
      return res.status(500).json({ error : 'Erreur du serveur'});
    } else {
      console.log(data);
      return res.status(200).json({"Post supprimé" : data});
    }
  });
}
 
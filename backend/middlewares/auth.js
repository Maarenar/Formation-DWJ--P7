const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const bodyUserId = parseInt(req.body.userId);
    if (bodyUserId && bodyUserId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch(e) {
    console.log(e); 
    /*
    res.status(401).json({
      error: 'Invalid request!'
    });*/
  }
};
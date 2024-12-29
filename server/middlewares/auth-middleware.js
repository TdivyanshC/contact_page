const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({message: "unauthorized http"});
    }
    
    
    const jwtToken = token.replace("Bearer", "").trim();
    console.log('token from auth middleware', jwtToken);
    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const userData = await User.findOne({ email: isVerified.email })
        .select({
            password: 0,
          });

        req.token = token;
        req.user = userData;
        req.userID = User._id;
        
        next();   
    } catch (error) {
        return res.status(401).json({message: "unauthorized invalid token"});
    }
};

module.exports = authMiddleware;
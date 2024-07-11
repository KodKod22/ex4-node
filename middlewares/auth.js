
exports.authMiddleware = {
    async(req, res, next) {
        const token = req.accessToken;
        // get user from db 
        // if user.acc != token :
            //throw erro
     next();
    }
}


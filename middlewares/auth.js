
exports.authMiddleware = {
    async checkAccesskey(req, res, next) {

        const token = req.body.friend_access_key;
        if (!token) {
            throw new Error("provied access token");
        }
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();

        const [friendRow] = await connection.execute(`SELECT *  FROM  tbl_55_friends as user where user.friend_access_key = '${req.body.friend_access_key}'`);
        connection.end();
        if (friendRow[0] != token) {
            throw new Error("not allowed");
        }
        
        req.user = friendRow[0];    
        next();
    }
}


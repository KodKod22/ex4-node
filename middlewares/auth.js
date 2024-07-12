
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
        console.log(friendRow);
        if (friendRow[0] != token) {
            
            throw new Error("not allowed");
        }
        
        req.user = friendRow[0];    
        next();
    },
    async checkDate(req, res, next) {
        const beginig = req.body.beginig;
        const end = req.body.end;

        const startDate = new Date(beginig);
        const endDate = new Date(end);
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays > 7) {
            throw new Error("the range of the dates is to big");    
        }
        next();
    }
}


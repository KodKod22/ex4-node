
exports.friendsController = {
    async addFriend(req,res){
        const token = crypto.randomUUID();
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        if (!req.body.friend_name || !req.body.friend_password) {
            return res.status(400).send("Input is null");
        }
        const {body} = req;
        await connection.execute(`INSERT INTO tbl_55_friends (friend_name,friend_password,friend_access_key) VALUES("${body.friend_name}", "${body.friend_password}","${token}")`);
        connection.end();
        res.send(token);
    }
}
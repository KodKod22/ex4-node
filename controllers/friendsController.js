
exports.friendsController = {
    async addFriend(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        await connection.execute(`INSERT INTO tbl_55_friends (friend_name,friend_password) VALUES("${body.friend_name}", "${body.friend_password}")`);
        connection.end();
        res.send(true);
    }
}
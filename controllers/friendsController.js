
exports.friendsController = {
    async addFriend(req,res){
        //if !req.friend_name || !friend pasword thorw error
        const token = crypto.randomUUID();
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        await connection.execute(`INSERT INTO tbl_55_friends (friend_name,friend_password,friend_access_key) VALUES("${body.friend_name}", "${body.friend_password}","${token}")`);
        connection.end();
        res.send(true);
    }
}
/*
1) */
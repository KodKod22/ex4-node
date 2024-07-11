
exports.friendsController = {
    async addFriend(req,res){
        
        if(!req.friend_name || !req.friend_password){
            console.error('input null',req.friend_name,req.friend_password);
            res.status(400).send('input is broken');
        }
        
        const token = crypto.randomUUID();
        console.log(token);
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        await connection.execute(`INSERT INTO tbl_55_friends (friend_name,friend_password,friend_access_key) VALUES("${body.friend_name}", "${body.friend_password}","${token}")`);
        connection.end();
        res.send(token);
    }
}
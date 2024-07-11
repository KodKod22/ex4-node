
exports.postsController = {
    async addPost(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        
        const user1 = req.user["id_friend"];
        console.log(user1);
        await connection.execute(`INSERT INTO tbl_55_post (id_friend, beginig, end, destination, tripType) VALUES("${user1}", "${body.beginig}", "${body.end}", "${body.destination}", "${body.tripType}")`);

        connection.end()
        res.send(true);
    }
}
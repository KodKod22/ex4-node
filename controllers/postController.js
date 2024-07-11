
exports.postsController = {
    async addPost(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        const user1 = req.user["id_friend"];
        
        await connection.execute(`INSERT INTO tbl_55_post (id_friend, beginig, end, destination, tripType) VALUES("${user1}", "${body.beginig}", "${body.end}", "${body.destination}", "${body.tripType}")`);

        connection.end()
        res.send(true);
    },
    
    async updatePost(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        const userID = req.user["id_friend"];

        await connection.execute(`UPDATE tbl_55_post SET id_friend = '${userID}', beginig = '${body.beginig}', end = '${body.end}', destination = '${body.destination}', tripType = '${body.tripType}' WHERE id_friend = '${userID}'`);        

        connection.end()
        res.send(true);
    }
}
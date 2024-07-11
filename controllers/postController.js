
exports.postsController = {
    async addpost(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();
        const {body} = req;
        //await connection.execute(`INSERT INTO tbl_55_posts (post_name,post_password) VALUES("${body.post_name}", "${body.friend_password}")`);
        //connection.end();
        res.send(true);
    }
}
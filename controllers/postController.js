
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
    },
    async getPost(req,res) {
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();

        const [rows]= await connection.execute(`SELECT * FROM tbl_55_post`);
        res.json(rows);
        connection.end()
        
        return rows;   
    },
    async calculateTripsResult(req,res){
        const {dbConnection} = require('../dbConnection');
        const connection = await dbConnection.createConnection();

        const [rowsCount] = await connection.execute(`SELECT COUNT(*) AS namesCount FROM tbl_55_post;`);
        if (rowsCount[0].namesCount < 5) {
            throw new Error("no everyone enter there trip preference");
        }

        const [tripTypeRow] = await connection.execute(`SELECT tripType, count(*) AS namesCount FROM tbl_55_post GROUP BY tripType ORDER BY namesCount DESC LIMIT 1;`);
        const tripType = tripTypeRow[0].tripType;

        const [destinationRow] =  await connection.execute(`SELECT destination, count(*) AS namesCount FROM tbl_55_post group by destination ORDER BY namesCount DESC LIMIT 1;`);
        const destination = destinationRow[0].destination;
        
        const [beginigRow] =  await connection.execute(`SELECT beginig, count(*) AS namesCount FROM tbl_55_post group by beginig ORDER BY namesCount DESC limit 1;`);
        const beginig = beginigRow[0].beginig;

        const [endRow] =  await connection.execute(`SELECT end, count(*) AS namesCount FROM tbl_55_post group by end ORDER BY namesCount DESC limit 1;`);
        const end = endRow[0].end;

        res.json({
            tripType,
            destination,
            beginig,
            end,
        });
        connection.end();
        
    }
}
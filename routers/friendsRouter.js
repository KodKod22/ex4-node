const { Router } = require('express');
const { friendsController} = require('../controllers/friendsController.js');

const friendsRouter = new Router();
friendsRouter.post('/addFriend',friendsController.addFriend);
module.exports = {friendsRouter};
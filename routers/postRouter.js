const authMiddleware = require('./middlewares/auth.js');
const { Router } = require('express');
const { postController} = require('../controllers/postController.js');

const postRouter = new Router();
postRouter.post('/add',authMiddleware,postController.addFriend);
module.exports = {postRouter};
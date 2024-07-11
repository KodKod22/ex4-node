
const { Router } = require('express');
const { postsController} = require('../controllers/postController.js');
const { authMiddleware} = require('../middlewares/auth.js');

const postRouter = new Router();
postRouter.post('/add',authMiddleware.checkAccesskey,postsController.addPost);
postRouter.put('/update',authMiddleware.checkAccesskey,postsController.updatePost);
module.exports = {postRouter};
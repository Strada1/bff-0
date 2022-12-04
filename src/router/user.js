const { Router } = require('express');
const { createUserValidator, userIdValidator, authenticateUserValidator } = require('../validators/user');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/', createUserValidator, userController.create);
userRouter.get('/', userController.get);
userRouter.put('/:userId', userIdValidator, userController.update);
userRouter.delete('/:userId', userIdValidator, userController.delete);
userRouter.post('/auth', authenticateUserValidator, userController.authenticate);

module.exports = { userRouter };

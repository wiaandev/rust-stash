import express, { Express, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';
import { UserModel } from '../models/User.model';

const userRouter: Express = express();
const userController = new UserController();

userRouter.get('/users', userController.getAllUsers.bind(userController));
userRouter.post('/users', userController.addUser.bind(userController));

module.exports = userRouter;

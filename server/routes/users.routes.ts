import express, { Express, Request, Response } from 'express';
import { UserController } from '../controllers/users.controller';

const userRouter: Express = express();
const userController = new UserController();

userRouter.get('/users/:email', userController.getUser);
userRouter.post('/users', userController.addUser);
userRouter.post('/users/login', userController.loginUser);

module.exports = userRouter;

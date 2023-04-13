"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const userRouter = (0, express_1.default)();
const userController = new users_controller_1.UserController();
userRouter.get('/users/:email', userController.getUser);
userRouter.post('/users', userController.addUser);
userRouter.post('/users/login', userController.loginUser);
module.exports = userRouter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_model_1 = require("../models/User.model");
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_model_1.UserModel.find({});
            return res.json(users);
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, auth, isAuth } = req.body;
            const user = yield User_model_1.UserModel.create({
                email,
                auth,
                isAuth,
            });
            res.send(user);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.email;
                const user = yield User_model_1.UserModel.findOne({ email });
                if (user) {
                    res.send(user);
                }
                else {
                    res.status(409).json({ msg: 'user not found' });
                }
            }
            catch (err) {
                res.status(409).json({ msg: err });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, question, answer } = req.body;
                const user = yield User_model_1.UserModel.findOne({ email: email });
                if (!user) {
                    return res
                        .status(404)
                        .json({ msg: `This email was not found` });
                }
                return res.status(200).json({ auth: user.auth[0] });
            }
            catch (error) {
                return res.status(500).send(error);
            }
        });
    }
}
exports.UserController = UserController;

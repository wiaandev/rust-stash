import { Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';
import { UserModel } from '../models/User.model';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find({});
    return res.json(users);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const { email, auth, isAuth } = req.body;

    const user = await UserModel.create({
      email,
      auth,
      isAuth,
    });

    res.send(user);
  }

  async getUser(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await UserModel.findOne({ email });

      if (user) {
        res.send(user);
      } else {
        res.status(409).json({ msg: 'user not found' });
      }
    } catch (err) {
      res.status(409).json({ msg: err });
    }
  }

  async loginUser(req: Request, res: Response) {

    try {
      const { email, question, answer } = req.body;
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res
          .status(404)
          .json({ msg: `This email was not found` });
      }
      return res.status(200).json({ auth: user.auth[0] });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export { UserController };

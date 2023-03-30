import { Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';
import { UserModel } from '../models/User.model';

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserModel.find();
    res.json(users);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const { email, auth, isAuth } = req.body;

    // Getting all the inventory items
    const materials = await MaterialModel.find();

    const materialIds = materials.map((item) => item._id);
    console.log(materialIds);

    const user = await UserModel.create({
      email,
      auth,
      isAuth,
      userMaterials: materialIds.map((id) => ({ id })),
    });

    console.log(user.userMaterials);
    res.send(user);
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, question, answer } = req.body;

      const user = await UserModel.findOne({ email: email });

      if (user) {
        return res.status(200).json({ success: true });
      } else {
        res.status(409).json({ msg: 'user not found' });
      }

      if (
        question === user!.auth[0].question! &&
        answer === user!.auth[0].answer!
      ) {
        user!.isAuth = true;
        return res.status(200).json({ success: true });
      } else {
        res.status(409).json({ msg: 'question and answers error' });
      }
    } catch (err) {
      res.status(409).json({ msg: err });
    }
  }
}

export { UserController };

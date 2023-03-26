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

    const materialIds = materials.map(item => item._id)
    console.log(materialIds);

    const user = await UserModel.create({
      email,
      auth,
      isAuth,
      userMaterials: materialIds.map(id => ({id})),
    });

    console.log(user.userMaterials);
    res.send(user);
  }
}

export { UserController };

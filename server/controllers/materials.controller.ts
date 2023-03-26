import { Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';

class MaterialController {
    
  async getAllMaterials(req: Request, res: Response): Promise<void> {
    const materials = await MaterialModel.find().sort({ name: 1 });
    res.json(materials);
  }

  async addMaterial(req: Request, res: Response): Promise<void> {
    const { name, desc, categories, img, isCraftable } = req.body;
    const materials = await MaterialModel.create({
      name,
      desc,
      categories,
      img,
      isCraftable,
    });
    res.send(materials);
  }
}

export { MaterialController };

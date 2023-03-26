import { Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';

class MaterialController {
  async getAllMaterials(req: Request, res: Response){
    const materials = await MaterialModel.find().sort({ name: 1 });
    res.json(materials);
  }

  async getOneMaterial(req: Request, res: Response){
    const { id } = req.params;
    try {
      const singleMaterial = await MaterialModel.findById(id);
      res.json(singleMaterial);
    } catch (err) {
      res.status(404).send('Material not found');
    }
  }

  async addMaterial(req: Request, res: Response) {
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

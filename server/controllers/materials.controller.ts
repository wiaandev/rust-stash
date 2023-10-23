import { Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';

class MaterialController {
  async getAllMaterials(req: Request, res: Response) {
    try {
      const materials = await MaterialModel.find().sort({ name: 1 });
      res.json(materials);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  async getOneMaterial(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const singleMaterial = await MaterialModel.findById(id);
      res.json(singleMaterial);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }

  async addMaterial(req: Request, res: Response) {
    try {
      const { name, desc, categories, img, isCraftable } = req.body;
      const materials = await MaterialModel.create({
        name,
        desc,
        categories,
        img,
        isCraftable,
      });
      res.send(materials);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  // async deleteMaterial(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     console.log("ID: ", id);

  //     const material = await MaterialModel.findOne({ _id: id });

  //     console.log(material);

  //     if (!material) {
  //       return res.status(404).send({ error: 'Material does not exist' });
  //     }

  //     await material.deleteOne();
  //     res.send({ message: 'Material deleted successfully' });
  //   } catch (error) {
  //     return res.status(500).send({ error: error });
  //   }
  // }
}

export { MaterialController };

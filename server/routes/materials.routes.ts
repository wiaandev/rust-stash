import express, { Express, Request, Response } from 'express';
import { MaterialController } from '../controllers/materials.controller';
import { MaterialModel } from '../models/Material.model';

const materialRouter: Express = express();
const materialController = new MaterialController();

// materialRouter.get('/', (req: Request, res: Response) => {
//   res.send('Working!');
// });

// materialRouter.get('/materials', async (req: Request, res: Response) => {
//   const materials = await MaterialModel.find().sort({name: 1});
//   res.send(materials);
// });

// materialRouter.post('/materials', async (req: Request, res: Response) => {
//   const { name, desc, categories, img, isCraftable } = req.body;
//   const materials = await MaterialModel.create({
//     name,
//     desc,
//     categories,
//     img,
//     isCraftable,
//   });
//   res.send(materials);
// });

materialRouter.get(
  '/materials',
  materialController.getAllMaterials.bind(materialController)
);
materialRouter.post(
  '/materials',
  materialController.addMaterial.bind(materialController)
);

module.exports = materialRouter;

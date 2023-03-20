import express, { Express, Request, Response } from 'express';
import { MaterialModel } from '../models/Material.model';

const materialRouter: Express = express();

materialRouter.get('/', (req: Request, res: Response) => {
  res.send('Working!');
});

materialRouter.get('/materials', async (req: Request, res: Response) => {
  const materials = await MaterialModel.find();
  res.send(materials);
});

materialRouter.post('/materials', async (req: Request, res: Response) => {
  const { name, desc, categories, img, isCraftable } = req.body;
  const materials = await MaterialModel.create({
    name,
    desc,
    categories,
    img,
    isCraftable,
  });
  res.send(materials);
});

materialRouter.put('/materials/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { qty } = req.body;

  const materials = await MaterialModel.findByIdAndUpdate(
    id,
    { qty },
    { new: true }
  );
  res.send(materials);
});

module.exports = materialRouter;

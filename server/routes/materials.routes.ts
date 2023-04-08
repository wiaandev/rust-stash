import express, { Express, Request, Response } from 'express';
import { MaterialController } from '../controllers/materials.controller';

const materialRouter: Express = express();
const materialController = new MaterialController();

materialRouter.get(
  '/materials',
  materialController.getAllMaterials
);
materialRouter.get(
  '/materials/:id',
  materialController.getOneMaterial
);
materialRouter.post(
  '/materials',
  materialController.addMaterial
);

module.exports = materialRouter;

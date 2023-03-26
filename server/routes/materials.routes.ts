import express, { Express, Request, Response } from 'express';
import { MaterialController } from '../controllers/materials.controller';
import { MaterialModel } from '../models/Material.model';

const materialRouter: Express = express();
const materialController = new MaterialController();

materialRouter.get(
  '/materials',
  materialController.getAllMaterials.bind(materialController)
);
materialRouter.get(
  '/materials/:id',
  materialController.getOneMaterial.bind(materialController)
);
materialRouter.post(
  '/materials',
  materialController.addMaterial.bind(materialController)
);

module.exports = materialRouter;

import express, { Express, Request, Response } from 'express';
import { LocationController } from '../controllers/locations.controller';
import { MaterialModel } from '../models/Material.model';

const locationRouter: Express = express();
const locationController = new LocationController();

locationRouter.post('/locations/add', locationController.addLocation);
locationRouter.get('/locations', locationController.getLocations);
locationRouter.get('/locations/:id', locationController.getLocation)
locationRouter.get('/locations/single/:id', locationController.getAllItemsFromLocation);
locationRouter.get('/locations/:id/materials/:materialId', locationController.getOneItemFromLocation);
locationRouter.put('/locations/:locationId/materials/:materialId', locationController.updateQty);
module.exports = locationRouter;
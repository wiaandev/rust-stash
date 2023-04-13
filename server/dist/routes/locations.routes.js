"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locations_controller_1 = require("../controllers/locations.controller");
const locationRouter = (0, express_1.default)();
const locationController = new locations_controller_1.LocationController();
locationRouter.post('/locations/add', locationController.addLocation);
locationRouter.get('/locations', locationController.getLocations);
locationRouter.get('/locations/:id', locationController.getLocation);
locationRouter.get('/locations/single/:id', locationController.getAllItemsFromLocation);
locationRouter.get('/locations/:id/materials/:materialId', locationController.getOneItemFromLocation);
locationRouter.put('/locations/:locationId', locationController.updateQty);
locationRouter.put('/locations/:locationId/to/:newLocation', locationController.transferInventory);
module.exports = locationRouter;

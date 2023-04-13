"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const materials_controller_1 = require("../controllers/materials.controller");
const materialRouter = (0, express_1.default)();
const materialController = new materials_controller_1.MaterialController();
materialRouter.get('/materials', materialController.getAllMaterials);
materialRouter.get('/materials/:id', materialController.getOneMaterial);
materialRouter.post('/materials', materialController.addMaterial);
module.exports = materialRouter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialController = void 0;
const Material_model_1 = require("../models/Material.model");
class MaterialController {
    getAllMaterials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield Material_model_1.MaterialModel.find().sort({ name: 1 });
                res.json(materials);
            }
            catch (error) {
                return res.status(500).send({ error: error });
            }
        });
    }
    getOneMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const singleMaterial = yield Material_model_1.MaterialModel.findById(id);
                res.json(singleMaterial);
            }
            catch (err) {
                res.status(500).send({ error: err });
            }
        });
    }
    addMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, desc, categories, img, isCraftable } = req.body;
                const materials = yield Material_model_1.MaterialModel.create({
                    name,
                    desc,
                    categories,
                    img,
                    isCraftable,
                });
                res.send(materials);
            }
            catch (error) {
                return res.status(500).send({ error: error });
            }
        });
    }
}
exports.MaterialController = MaterialController;

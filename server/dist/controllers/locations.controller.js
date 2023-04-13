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
exports.LocationController = void 0;
const Location_model_1 = require("../models/Location.model");
const Material_model_1 = require("../models/Material.model");
const { ObjectId } = require('mongodb');
class LocationController {
    addLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, address, img } = req.body;
                const materials = yield Material_model_1.MaterialModel.find();
                if (!materials) {
                    return res.status(404).json({ msg: 'Materials were not found!' });
                }
                const location = yield Location_model_1.LocationModel.create({
                    name,
                    address,
                    img,
                    locationItems: materials.map((item) => ({
                        materialId: item._id,
                        qty: item.qty,
                    })),
                });
                return res.status(200).send(location);
            }
            catch (error) {
                res.status(500).send({ msg: error });
            }
        });
    }
    getLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const LocationId = req.params.id;
                const Location = yield Location_model_1.LocationModel.findById(LocationId).populate({
                    path: 'locationItems.materialId',
                    populate: {
                        path: 'name',
                        select: 'name',
                    },
                    model: Material_model_1.MaterialModel,
                });
                if (!Location) {
                    return res
                        .status(404)
                        .json(`Location with ${LocationId} does not exist on users account`);
                }
                return res.status(200).json(Location);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    getLocations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield Location_model_1.LocationModel.find().populate({
                    path: 'locationItems.materialId',
                    populate: {
                        path: 'name',
                        select: 'name',
                    },
                    model: Material_model_1.MaterialModel,
                });
                if (!locations) {
                    return res.status(404).send('No locations have been found!');
                }
                return res.status(200).send(locations);
            }
            catch (err) {
                return res.status(500).send({ error: err });
            }
        });
    }
    getOneItemFromLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.id;
                const { materialId } = req.params;
                const location = yield Location_model_1.LocationModel.findById(locationId);
                if (!location) {
                    return res
                        .status(404)
                        .send(`Could not find location with ID ${locationId}`);
                }
                const materialIndex = location.locationItems.findIndex((item) => item.materialId.toString() === materialId);
                if (materialIndex === -1) {
                    return res
                        .status(404)
                        .send(`Could not find material with ID ${materialId} in location with ID ${locationId}`);
                }
                const material = location.locationItems[materialIndex];
                const locationPop = yield Location_model_1.LocationModel.findOne({
                    _id: locationId,
                    locationItems: {
                        $elemMatch: {
                            materialId: materialId,
                        },
                    },
                }).populate({
                    path: 'locationItems.materialId',
                    populate: {
                        path: 'name',
                        select: 'name',
                    },
                    model: Material_model_1.MaterialModel,
                });
                return res.send(locationPop === null || locationPop === void 0 ? void 0 : locationPop.locationItems[materialIndex]);
            }
            catch (error) {
                return res.status(500).send({ error: error });
            }
        });
    }
    getAllItemsFromLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.id;
                const location = yield Location_model_1.LocationModel.findById(locationId);
                if (!location) {
                    return res
                        .status(404)
                        .send(`Could not find location with ID ${locationId}`);
                }
                const locationPop = yield Location_model_1.LocationModel.findById(locationId).populate({
                    path: 'locationItems.materialId',
                    populate: {
                        path: 'name',
                        select: 'name',
                    },
                    model: Material_model_1.MaterialModel,
                });
                return res.send([locationPop]);
            }
            catch (error) {
                return res.status(500).send({ error: error });
            }
        });
    }
    updateQty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.locationId;
                const materialId = req.query.materialId;
                const newQty = req.body.qty;
                const Location = yield Location_model_1.LocationModel.updateOne({
                    _id: locationId,
                    [`locationItems.materialId`]: materialId,
                }, {
                    $set: { [`locationItems.$.qty`]: newQty },
                });
                if (!Location) {
                    return res
                        .status(204)
                        .json({
                        returnmessage: `Location with id ${locationId} was not found`,
                    });
                }
                return res.status(200).send(Location);
            }
            catch (error) {
                return res.status(500).send('Internal server error' && error);
            }
        });
    }
    transferInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.locationId;
                const newLocation = req.params.newLocation;
                const materialId = req.query.materialId;
                const currentAmount = req.body.currentAmount;
                const sendingAmount = req.body.sendingAmount;
                if (locationId === newLocation) {
                    return res.status(409).send({ msg: 'You cannot send to the same location!' });
                }
                const currentLocation = yield Location_model_1.LocationModel.updateOne({
                    _id: locationId,
                    [`locationItems.materialId`]: materialId,
                }, {
                    $set: { [`locationItems.$.qty`]: currentAmount - sendingAmount },
                });
                if (!currentLocation) {
                    return res.status(404).send(`Cannot find ${currentLocation}`);
                }
                const sendingLocation = yield Location_model_1.LocationModel.updateOne({
                    _id: newLocation,
                    [`locationItems.materialId`]: materialId,
                }, {
                    $set: { [`locationItems.$.qty`]: currentAmount + sendingAmount },
                });
                return res.status(200).send({ currentLocation, sendingLocation });
            }
            catch (error) {
                res.status(500).send({ error: error });
            }
        });
    }
}
exports.LocationController = LocationController;

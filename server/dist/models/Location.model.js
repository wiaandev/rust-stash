"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
class InventoryDetails {
}
__decorate([
    (0, typegoose_1.prop)({
        _id: false,
        type: () => mongoose_1.Schema.Types.ObjectId,
    }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], InventoryDetails.prototype, "materialId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], InventoryDetails.prototype, "qty", void 0);
class Location {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Location.prototype, "img", void 0);
__decorate([
    (0, typegoose_1.prop)({ _id: false, type: () => [InventoryDetails] }),
    __metadata("design:type", Array)
], Location.prototype, "locationItems", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => mongoose_1.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Location.prototype, "materialId", void 0);
exports.LocationModel = (0, typegoose_1.getModelForClass)(Location);

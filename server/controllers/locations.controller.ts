import { Request, Response } from 'express';
import { LocationModel } from '../models/Location.model';
import { MaterialModel } from '../models/Material.model';
const {ObjectId} = require('mongodb');

class LocationController {
  async addLocation(req: Request, res: Response) {
    try {
      const { name, address, img } = req.body;

      // Getting all the inventory items
      const materials = await MaterialModel.find();

      if (!materials) {
        return res.status(404).json({ msg: 'Materials were not found!' });
      }

      const location = await LocationModel.create({
        name,
        address,
        img,
        locationItems: materials.map((item) => ({
          materialId: item._id,
          qty: item.qty,
        })),
      });

      return res.status(200).send(location);

      //   res.send(location);
    } catch (error) {
      console.log(error);
    }
  }

  async getLocation(req: Request, res: Response) {
    try {
      const LocationId = req.params.id;
      const Location = await LocationModel.findById(LocationId).populate({
        path: 'locationItems.materialId',
        populate: {
          path: 'name',
          select: 'name',
        },
        model: MaterialModel,
      });

      if (!Location) {
        return res
          .status(404)
          .json(`Location with ${LocationId} does not exist on users account`);
      }

      return res.status(200).json(Location);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  async getLocations(req: Request, res: Response) {
    try {
      const locations = await LocationModel.find().populate({
        path: 'locationItems.materialId',
        populate: {
          path: 'name',
          select: 'name',
        },
        model: MaterialModel,
      });
      if (!locations) {
        return res.status(404).send('No locations have been found!');
      }
      return res.status(200).send(locations);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  }

  async getOneItemFromLocation(req: Request, res: Response) {
    try {
      const locationId = req.params.id;
      const { materialId } = req.params;
      console.log(locationId);
      console.log(materialId);

      const location = await LocationModel.findById(locationId);

      console.log(location);

      if (!location) {
        console.log('Cannot find location' + location);
        return res
          .status(404)
          .send(`Could not find location with ID ${locationId}`);
      }

      const materialIndex = location.locationItems.findIndex(
        (item) => item.materialId.toString() === materialId
      );

      if (materialIndex === -1) {
        console.log('Cannot find material');
        return res
          .status(404)
          .send(
            `Could not find material with ID ${materialId} in location with ID ${locationId}`
          );
      }

      const material = location.locationItems[materialIndex];

      const locationPop = await LocationModel.findOne({
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
        model: MaterialModel,
      });

      console.log('found material' + material);

      return res.send(locationPop?.locationItems[materialIndex]);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
  }

  async getAllItemsFromLocation(req: Request, res: Response) {
    try {
      const locationId = req.params.id;
      console.log(locationId);

      // const locationPop = await LocationModel.findById(locationId).populate({
      //   path: 'locationItems.materialId',
      //   populate: {
      //     path: 'name',
      //     select: 'name',
      //   },
      //   model: MaterialModel,
      // });

      const location = await LocationModel.findById(locationId);

      console.log(location);

      if (!location) {
        console.log('Cannot find location' + location);
        return res
          .status(404)
          .send(`Could not find location with ID ${locationId}`);
      }

      const locationPop = await LocationModel.findById(locationId).populate({
        path: 'locationItems.materialId',
        populate: {
          path: 'name',
          select: 'name',
        },
        model: MaterialModel,
      });
      console.log('found location! ' + locationPop);
      return res.send([locationPop]);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
  }

  async updateQty(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const materialId = req.params.materialId;
      const qty = req.body;

      // console.log(locationId);
      // console.log(materialId);
      console.log(qty);

      const location = await LocationModel.findById(locationId);
      if (!location) {
        console.log(`${locationId} not found`);
        return res
          .status(400)
          .send(`Location with ID: ${locationId} could not be found`);
      }

      // console.log(location);

      const material = location.locationItems.find(
        (item) => item.materialId.toString() === materialId
      );

      if (!material) {
        console.log(`${materialId} not found in ${locationId}`);
        return res
          .status(404)
          .send(
            `Material with ID: ${materialId} could not be found in ${locationId}`
          );
      }

      const updatedQty = await LocationModel.updateOne(
        {materialId: materialId},
        {$set: {qty: qty}},
      );

      if (updatedQty.modifiedCount === 0) {
        return res.status(404).send(`Could not update!`);
      }
      

      // if(!updatedQty.acknowledged){
      //   return res.status(400).send({msg: updatedQty.acknowledged});
      // }

      console.log(updatedQty);
      console.log('Material Updated');

      res.status(200).send(updatedQty);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Something went wrong');
    }
  }

  // async updateitemQuantity(req: Request, res: Response) {
  //   const itemId = req.params.id;
  //   const clickCounted = req.body.clickCounted;
  //   const stashUpdate = {};

  //   if (clickCounted < 0) {
  //     stashUpdate.$inc = { "stash.quantity": clickCounted };
  //   } else {
  //     stashUpdate.$inc = { "stash.quantity": clickCounted };
  //   }

  //   const globalUpdate = await StashModel.updateOne({ id: itemId }, stashUpdate);

  //   res.send(globalUpdate);
  // }
}

export { LocationController };

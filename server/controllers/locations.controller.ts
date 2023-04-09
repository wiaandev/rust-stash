import { Request, Response } from 'express';
import { LocationModel } from '../models/Location.model';
import { MaterialModel } from '../models/Material.model';
import { index } from '@typegoose/typegoose';

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
      console.log("found location! " + locationPop);
      return res.send([locationPop]);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
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
import { Request, Response } from 'express';
import { LocationModel } from '../models/Location.model';
import { MaterialModel } from '../models/Material.model';
const { ObjectId } = require('mongodb');

class LocationController {
  async addLocation(req: Request, res: Response) {
    try {
      const { name, address, img } = req.body;

      const materials = await MaterialModel.find();

      if (!materials) {
        return res.status(404).json({ msg: 'Materials were not found!' });
      }

      const location = await LocationModel.create({
        name,
        address,
        img,
        locationItems: materials.map((item: any) => ({
          materialId: item._id,
          qty: item.qty,
        })),
      });

      return res.status(200).send(location);

    } catch (error) {
      res.status(500).send({msg: error})
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
      return res.status(500).send({ error: err });
    }
  }

  async getOneItemFromLocation(req: Request, res: Response) {
    try {
      const locationId = req.params.id;
      const { materialId } = req.params;

      const location = await LocationModel.findById(locationId);


      if (!location) {
        return res
          .status(404)
          .send(`Could not find location with ID ${locationId}`);
      }

      const materialIndex = location.locationItems.findIndex(
        (item: any) => item.materialId.toString() === materialId
      );

      if (materialIndex === -1) {
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


      return res.send(locationPop?.locationItems[materialIndex]);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  async getAllItemsFromLocation(req: Request, res: Response) {
    try {
      const locationId = req.params.id;

      const location = await LocationModel.findById(locationId);


      if (!location) {
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
      return res.send([locationPop]);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  }

  async updateQty(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const materialId = req.query.materialId;
      const newQty: number = req.body.qty;

      const Location = await LocationModel.updateOne(
        {
          _id: locationId,
          [`locationItems.materialId`]: materialId,
        },
        {
          $set: { [`locationItems.$.qty`]: newQty },
        }
      );

      if (!Location) {
        return res
          .status(204)
          .json({
            returnmessage: `Location with id ${locationId} was not found`,
          });
      }

      return res.status(200).send(Location);
    } catch (error) {
      return res.status(500).send('Internal server error' && error);
    }
  }

  async transferInventory(req: Request, res: Response){
    try {
      const locationId = req.params.locationId;
      const newLocation = req.params.newLocation;
      const materialId = req.query.materialId;
      const currentAmount:number = req.body.currentAmount;
      const sendingAmount:number = req.body.sendingAmount;

      if(locationId === newLocation){
        return res.status(409).send({msg: 'You cannot send to the same location!'});
      }
  
      const currentLocation = await LocationModel.updateOne(
        {
          _id: locationId,
          [`locationItems.materialId`]: materialId,
        },
        {
          $set: { [`locationItems.$.qty`]: currentAmount - sendingAmount },
        }
      );


      if(!currentLocation){
        return res.status(404).send(`Cannot find ${currentLocation}`);
      }
  
      const sendingLocation = await LocationModel.updateOne(
        {
          _id: newLocation,
          [`locationItems.materialId`]: materialId,
        },
        {
          $set: { [`locationItems.$.qty`]: currentAmount + sendingAmount },
        }
      )

      return res.status(200).send({currentLocation, sendingLocation});
    } catch (error) {
      res.status(500).send({error: error})
    }
  }
}

export { LocationController };

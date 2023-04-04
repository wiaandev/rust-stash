import { Request, Response } from 'express';
import { LocationModel } from '../models/Location.model';
import { MaterialModel } from '../models/Material.model';

class LocationController {
  async addLocation(req: Request, res: Response) {
    try {
      const { name, address, img } = req.body;

      // Getting all the inventory items
      const materials = await MaterialModel.find();

      if(!materials){
        return res.status(404).json({msg: 'Materials were not found!'})
      }
      const materialIds = materials.map((item) => item._id);


      const location = await LocationModel.create({
        name,
        address,
        img,
        locationItems: materials.map((item) => item._id)
      });


      return res.status(200).send(location)


    //   res.send(location);
    } catch (error) {
        console.log(error);
    }
  }
  async getLocation(req: Request, res: Response){
    try {
        const LocationId = req.params.id;
        const Location = await LocationModel.findById(LocationId).populate({
            path: 'locationItems',
            populate: {
                path: 'name',
                select: 'name'
            },
            model: MaterialModel
        });

        if(!Location){
            return res.status(404).json(`Location with ${LocationId} does not exist on users account`);
        }

        return res.status(200).json(Location)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error})
    }
  }
}


export { LocationController };

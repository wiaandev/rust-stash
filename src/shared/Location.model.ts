import { InventoryDetails } from './InventoryDetails.model';
import { MaterialModel } from './Materials.model';

export class LocationModel {
  public _id!: string;
  public name!: string;
  public address!: string;
  public img!: string;
  public locationItems!: InventoryDetails[];

  constructor(_id: string, name: string, address: string, img: string, locationItems: InventoryDetails[]) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.img = img;
    this.locationItems = locationItems;
  }
}

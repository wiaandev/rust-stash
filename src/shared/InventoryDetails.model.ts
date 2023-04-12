import { MaterialModel } from './Materials.model';

export class InventoryDetails {
  public _id!: string;
  public materialId!: MaterialModel[];
  public qty!: number;

  constructor(_id: string, materialId: MaterialModel[], qty: number) {
    this._id = _id;
    this.materialId = materialId;
    this.qty = qty
  }
}

export class MaterialModel {
  public id: number;
  public name: string;
  public desc: string;
  public categories: string[];
//   public qty: number;
//   public lowQty: boolean;
//   public img: string;
//   public isCraftable: boolean;
//   public locations: LocationInterface[];

  constructor(
    id: number,
    name: string,
    desc: string,
    categories: string[],
    // qty: number,
    // lowQty: boolean,
    // img: string,
    // isCraftable: boolean,
    // locations: LocationInterface[],
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.categories = categories;
    // this.qty = qty;
    // this.lowQty = lowQty;
    // this.img = img;
    // this.isCraftable = isCraftable;
    // this.locations = locations;
  }
}

import { LocationInterface } from '../interfaces/location.interface';
import { MaterialInterface } from '../interfaces/materials.interface';

export class RecipeModel {
  public id: number;
  public name: string;
  public desc: string;
  public categories: string[];
  // public qty: number;
  // public lowQty: boolean;
  public img: string;
  // public locations: LocationInterface[];
  public materials: MaterialInterface[];

  constructor(
    id: number,
    name: string,
    desc: string,
    categories: string[],
    // qty: number,
    // lowQty: boolean,
    img: string,
    // locations: LocationInterface[],
    materials: MaterialInterface[]
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.categories = categories;
    // this.qty = qty;
    // this.lowQty = lowQty;
    this.img = img;
    // this.locations = locations;
    this.materials = materials;
  }
}

[
  {
    _id: "fdsjkfjsdfds2e324io",
    name: 'ak47',
    categories: ['weaponry', 'tools'],
    img: 'https://www.feetfinder.com/',
    materials: [
      {
        name: 'wood',
        qty: 2,
        img: 'http://www.feetfinder.com',
      },
      {
        name: 'wood',
        qty: 2,
        img: 'http://www.feetfinder.com',
      },
      {
        name: 'wood',
        qty: 2,
        img: 'http://www.feetfinder.com',
      }
    ]
  }
]

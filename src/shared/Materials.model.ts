export class MaterialModel {
  public name: string;
  public desc: string;
  public categories: string[];
  public img: string;
  public isCraftable: string;

  constructor(
    name: string,
    desc: string,
    categories: string[],
    img: string,
    isCraftable: string
  ) {
    this.name = name;
    this.desc = desc;
    this.categories = categories;
    this.img = img;
    this.isCraftable = isCraftable;
  }
}

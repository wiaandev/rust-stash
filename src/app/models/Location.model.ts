import { MaterialInterface } from "../interfaces/materials.interface";

export class LocationModel {
    public id: string;
    public name: string;
    public address: string;
    public img: string;
    public items: MaterialInterface[];
}
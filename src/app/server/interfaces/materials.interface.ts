import { LocationInterface } from "./location.interface";

export interface MaterialInterface{
    id: string;
    name: string;
    qty: number;
    lowQty: boolean;
    img: string;
    isCraftable: boolean;
    locations: LocationInterface[];
}
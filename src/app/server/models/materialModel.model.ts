import {prop, getModelForClass} from '@typegoose/typegoose';

export class Material{
    @prop({required: true})
    name: string;

    @prop({required: true})
    desc: string;

    @prop({type: () => [String]})
    categories: string[];
}

export const MaterialModel = getModelForClass(Material);
import {prop, getModelForClass} from '@typegoose/typegoose';

export class Material{
    @prop({required: true})
    public name: string;

    @prop({required: true})
    public desc: string;

    @prop({type: () => [String]})
    public categories: string[];

    @prop({required: true})
    public img: string

    @prop({required: true})
    public isCraftable: boolean;
}

export const MaterialModel = getModelForClass(Material);
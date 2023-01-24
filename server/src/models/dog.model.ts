import {prop, getModelForClass} from "@typegoose/typegoose";

export class Dog {
  @prop({ required: true })
  public name!: string;
}

export const DogModel = getModelForClass(Dog);
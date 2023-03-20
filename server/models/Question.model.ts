import { prop, getModelForClass } from '@typegoose/typegoose';

export class Question {
  @prop({ required: true })
  public img: string;

  @prop({ required: true, type: () => [String] })
  public answers: string;

  @prop({ required: true })
  public corrrectAnswer: string;

  @prop({ required: true })
  public question: string;
}

export const QuestionModel = getModelForClass(Question);

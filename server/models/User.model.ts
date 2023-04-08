import { prop, getModelForClass, Ref } from '@typegoose/typegoose';


class AuthChecker {
  @prop({ required: true })
  public question!: string;

  @prop({ required: true })
  public answer!: string;
}

export class User {
  @prop({ unique: true })
  public email: string;

  @prop({ type: () => [AuthChecker] })
  public auth!: AuthChecker[];

  @prop({default: false })
  public isAuth: boolean;

}

export const UserModel = getModelForClass(User);

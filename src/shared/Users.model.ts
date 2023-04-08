import { AuthModel } from "./Auth.model";

export class UserModel {
    public email: string;
    public auth: AuthModel[];
    public isAuth: boolean;
  
    constructor(
      email: string,
      auth: AuthModel[],
      isAuth: boolean,
    ) {
      this.email = email;
      this.auth = auth;
      this.isAuth = isAuth;
    }
  }
  
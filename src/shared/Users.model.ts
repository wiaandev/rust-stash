import { MaterialModel } from "./Materials.model";
import { AuthModel } from "./Auth.model";

export class UserModel {
    public email: string;
    public auth: AuthModel[];
    public isAuth: boolean;
    public userMaterials?: MaterialModel[];
  
    constructor(
      email: string,
      auth: AuthModel[],
      isAuth: boolean,
      userMaterials?: MaterialModel[],
    ) {
      this.email = email;
      this.auth = auth;
      this.isAuth = isAuth;
      this.userMaterials = userMaterials;
    }
  }
  
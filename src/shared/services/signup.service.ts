import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/shared/Users.model";

@Injectable({providedIn: 'root'})
export class SignupService{

    constructor(private http: HttpClient){}

    serverLink: string = "http://localhost:3000/users";

    getUsers(): Observable<UserModel[]>{
        return this.http.get<UserModel[]>(this.serverLink)
    }

    addUser(user: UserModel): Observable<UserModel[]>{
        return this.http.post<UserModel[]>(this.serverLink, user)
    }

}
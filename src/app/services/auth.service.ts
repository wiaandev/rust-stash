import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/shared/Users.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  serverLink: string = 'http://localhost:3000/users/login';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.serverLink);
  }

  loginUser(
    email: string,
    question: string,
    answer: string,
    isAuth: boolean
  ): Observable<UserModel[]> {
    const payload = {
      email: email,
      auth: [
        {
          question: question,
          answer: answer,
        },
      ],
      isAuth: isAuth,
    };
    return this.http.post<UserModel[]>(this.serverLink, payload);
  }
}

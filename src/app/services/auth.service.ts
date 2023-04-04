import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/shared/Users.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  serverLink: string = 'http://localhost:3000/users';

  user: any;
  userStored: any;
  data: any;
  // getUsers(): Observable<UserModel[]> {
  //   console.log('Get users is running')
  //   return this.http.get<UserModel[]>(`${this.se}`)
  // }

  checkEmail(email: string) {
    return this.http.get<UserModel[]>(`${this.serverLink}/${email}`);
  }

  // checkQuestionAndAnswer(
  //   question: string,
  //   answer: string,
  //   isAuth: boolean
  // ): Observable<UserModel[]> {
  //   const payload = {
  //     auth: [
  //       {
  //         question: question,
  //         answer: answer,
  //       },
  //     ],
  //     isAuth: isAuth,
  //   };
  //   return this.http.post<UserModel[]>(this.serverLink, payload);
  // }
}

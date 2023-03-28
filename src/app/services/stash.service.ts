import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialModel } from 'src/shared/Materials.model';

@Injectable({ providedIn: 'root' })
export class StashService {
  constructor(private http: HttpClient) {}

  serverLink: string = 'http://localhost:3000/materials';

  materials: MaterialModel[] = [];

  getAllStash(): Observable<MaterialModel[]> {
    return this.http.get<MaterialModel[]>(this.serverLink);
  }

  getOneItem(id: string) {
    return this.http.get<MaterialModel[]>(`${this.serverLink}/${id}`);
  }

  getStashBySearch(search: string): Observable<MaterialModel[]> {
    return this.http.get<MaterialModel[]>(
      `${this.serverLink}?search=${search}`
    );
  }
}

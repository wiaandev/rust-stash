import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocationModel } from "../Location.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class LocationService{

    constructor(private http: HttpClient){}

    serverLink = 'http://localhost:3000/locations';

    locationData: LocationModel[];

    getOneLocation(id: string){
        return this.http.get<LocationModel[]>(`${this.serverLink}/${id}`);
    }

    getAllLocations(): Observable<LocationModel[]> {
        return this.http.get<LocationModel[]>(this.serverLink);
    }

    getMaterialFromLocation(locationId: string, materialId: string){
        console.log(`${this.serverLink}/${locationId}/materials/${materialId}`);
        return this.http.get<LocationModel[]>(`${this.serverLink}/${locationId}/materials/${materialId}`);
    }

    getAllMaterialsFromLocation(locationId: string){
        return this.http.get<LocationModel[]>(`${this.serverLink}/single/${locationId}`);
    }
}
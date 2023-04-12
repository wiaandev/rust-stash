import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocationModel } from "../Location.model";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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

    updateQty(locationId: string, materialId: string, qty: number){
        const updatedQty = {qty: qty}
        return this.http.put<LocationModel[]>(`${this.serverLink}/${locationId}?materialId=${materialId}`, updatedQty)
    } 
    
    transferInventory(currentLocation: string, newLocation: string, materialId: string, body: {}){
        return this.http.put<LocationModel[]>(`${this.serverLink}/${currentLocation}/to/${newLocation}?materialId=${materialId}`, body).pipe(
            catchError(this.handleError)
        );
    }

    getMaterialsBySearch(search: string): Observable<LocationModel[]> {
        return this.http.get<LocationModel[]>(
          `${this.serverLink}?search=${search}`
        )
    }


    private handleError(error: HttpErrorResponse): Observable<string>{
        let errorMessage = 'An error occured';
        if(error.error instanceof ErrorEvent){
            errorMessage = `Error: ${error.error.message}`
        }else {
            errorMessage = `${error.error.msg}`
        }
        return throwError(errorMessage)
    }
}
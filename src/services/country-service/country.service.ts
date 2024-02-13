import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from '../base-service/base-service';
import { ApiResponse } from '../../models/get/factory';

@Injectable({
  providedIn: 'root'
})
export class CountryService  extends BaseService<ApiResponse>{
  //private citiesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  //public cities$ = this.citiesSubject.asObservable();
  private mode: 'edit' | 'save' = 'edit'; // Default mode is 'edit'


  listOfCities=`${environment.apiUrl}country`;
  getResourceUrl(): string {
    return 'country';
   }

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
  setMode(mode: 'edit' | 'save'): void {
    this.mode = mode; // Set the mode
    console.log(`Mode set to '${mode}'`); // Log the mode change
  }

  getMode(): 'edit' | 'save' {
    return this.mode; // Return the current mode
  }
}

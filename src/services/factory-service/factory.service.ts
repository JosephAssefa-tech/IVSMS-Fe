import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from '../base-service/base-service';
import { ApiResponse } from '../../models/get/factory';


@Injectable({
  providedIn: 'root'
})
export class FactoryService extends BaseService<ApiResponse>  {
  private citiesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cities$ = this.citiesSubject.asObservable();

  listOfCities=`${environment.apiUrl}factory`;
  getResourceUrl(): string {
    return 'factory';
   }

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
}

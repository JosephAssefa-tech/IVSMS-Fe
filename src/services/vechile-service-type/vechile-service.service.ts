import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../../models/get/factory';
import { BaseService } from '../base-service/base-service';

@Injectable({
  providedIn: 'root'
})
export class VechileServiceService extends BaseService<ApiResponse> {
  listOfCities=`${environment.apiUrl}vehicleServiceTypes`;
  getResourceUrl(): string {
    return 'vehicleServiceTypes';
   }

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
}

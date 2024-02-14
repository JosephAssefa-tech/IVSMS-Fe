import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from '../base-service/base-service';
import { ApiResponse } from '../../models/get/factory';

@Injectable({
  providedIn: 'root'
})
export class VechileManufactureService extends BaseService<ApiResponse>  {
  listOfCities=`${environment.apiUrl}FactoryService`;
  getResourceUrl(): string {
    return 'FactoryService';
   }

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
}

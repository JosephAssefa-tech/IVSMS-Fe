import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../../models/get/factory';
import { BaseService } from '../base-service/base-service';

@Injectable({
  providedIn: 'root'
})
export class InflationService extends BaseService<ApiResponse> {


  listOfCities=`${environment.apiUrl}inflation`;
  getResourceUrl(): string {
    return 'inflation';
   }

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
}

import { BaseService } from '../base-service/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VehicleModel } from '../../models/post/vechile-model';
import { VechileFilterRequest } from '../../components/vechile-model/vechile-model/vechile-model.component';

@Injectable({
  providedIn: 'root'
})
export class VechileModelService extends BaseService<VehicleModel> {
  private saveLabel: string = 'Save';
  private editLabel: string = 'Update';

  filterEndpoint=`${environment.apiUrl}vechileFilter/`;


  private citiesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cities$ = this.citiesSubject.asObservable();


  listOfCities=`${environment.apiUrl}vechile`;

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'vechile';
   }
   getSaveLabel(): string {
    return this.saveLabel;
  }

  getEditLabel(): string {
    return this.editLabel;
  }
  //  getByLanguage(language:string)
  //  :Observable<any[]> {
  //   const params = { language: language };
  //   this.httpClient.get<any[]>(this.listOfCities, { params: params })
  //     .subscribe(city => {
  //       this.citiesSubject.next(city); // Update the regions data in the BehaviorSubject
  //     });

  //   return this.citiesSubject.asObservable(); // Return the Observable of the BehaviorSubject


  // }
  filterVechiles(request: VechileFilterRequest): Observable<any> {
  
      let params = new HttpParams();
      
     
      if (request.model) {
        params = params.set('model', request.model);
      }
      if (request.fuelType) {
        params = params.set('fuelType', request.fuelType);
      }
      if (request.factoryId) {
        params = params.set('factoryId', request.factoryId);
      }

      if (request.createdFrom) {
        params = params.set('From', request.createdFrom.toISOString());
      }
    
      if (request.createdTo) {
        params = params.set('To', request.createdTo.toISOString());
      }
  
      return this.httpClient.get<{ data: any }>(this.filterEndpoint, { params });
    }


}
import { BaseService } from '../base-service/base-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VehicleModel } from '../../models/post/vechile-model';

@Injectable({
  providedIn: 'root'
})
export class VechileModelService extends BaseService<VehicleModel> {
  private citiesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cities$ = this.citiesSubject.asObservable();


  listOfCities=`${environment.apiUrl}vechile`;

  constructor( httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'vechile';
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
}
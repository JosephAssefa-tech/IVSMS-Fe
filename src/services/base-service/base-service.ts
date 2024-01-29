import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export abstract class BaseService<T>
{

  private readonly APIUrl = environment.baseApiUrl + this.getResourceUrl();
constructor(protected httpClient:HttpClient)
{
}
abstract getResourceUrl(): string;


getAll(): Observable<Array<T>> {

  return this.httpClient.get<T[]>(this.APIUrl);

}
getAllByLanguage(language: string): Observable<Array<T>>
{
  const params = new HttpParams().set('language', language);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

  return this.httpClient.get<T[]>(this.APIUrl,{ params, headers });
}
get(id: string | number): Observable<[T]> {
  return this.httpClient.get<[T]>(this.APIUrl + "/" + id);
}
getById(id: string): Observable<T> {
  return this.httpClient.get<T>(this.APIUrl + "/" + id);
}

post(resource: any) {
  return this.httpClient.post(this.APIUrl ,resource,{headers:{"Content-Type":"application/json"}});

}
deletre(id: string | number) {
  return this.httpClient.delete(this.APIUrl + "/" + id);
}
delete(id: number |  string, paramName: string) {
  const params = new HttpParams().set(paramName, id.toString()); // Convert id to string if it's a number
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = { params, headers }; // Assign params and headers to options object
  
  return this.httpClient.delete(this.APIUrl, options); // Pass op
}
update(resource: any) {
  return this.httpClient.put(`${this.APIUrl}`, resource)

}

}
// const params = { language: language };
// return this.httpClient.get<any[]>(this.listOfRegions, { params: params });
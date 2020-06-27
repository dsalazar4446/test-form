import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(page: number = 1): Observable<any> {
    let url
    if(page === 1) {
      url = `${environment.url}/delivery-methods/listing?pages=${page}`;
    }else {
      url = `${environment.url}/delivery-methods/listing?pages=1&page=${page}`;
    }
    return this.http.get(url);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/delivery-methods/show/${id}`);
  }
}

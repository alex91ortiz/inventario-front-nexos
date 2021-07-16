import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../models/Cargo';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

const BASEURL = '/cargo/';
@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`${environment.host}${BASEURL}`);
    }
    create(data): Observable<Cargo> {
        return this.http.post(`${environment.host}${BASEURL}`, data);
    }
    get(id): Observable<Cargo> {
        return this.http.get(`${environment.host}${BASEURL}${id}`);
    }
    update(id, data): Observable<Cargo> {
        return this.http.put(`${environment.host}${BASEURL}${id}`, data);
    }
    delete(id): Observable<Cargo> {
        return this.http.delete(`${environment.host}${BASEURL}${id}`);
    }
    
}

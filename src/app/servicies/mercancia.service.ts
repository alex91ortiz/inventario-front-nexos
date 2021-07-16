import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Mercancia } from '../models/Mercancia';

const BASEURL = '/mercancia/';
@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`${environment.host}${BASEURL}`);
    }
    create(data): Observable<Mercancia> {
        return this.http.post(`${environment.host}${BASEURL}`, data);
    }
    get(id): Observable<Mercancia> {
        return this.http.get(`${environment.host}${BASEURL}${id}`);
    }
    update(id, data): Observable<Mercancia> {
        return this.http.put(`${environment.host}${BASEURL}${id}`, data);
    }
    delete(id): Observable<Mercancia> {
        return this.http.delete(`${environment.host}${BASEURL}${id}`);
    }
    
}

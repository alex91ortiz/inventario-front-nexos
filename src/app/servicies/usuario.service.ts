import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/Usuario';

const BASEURL = '/usuario/';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`${environment.host}${BASEURL}`);
    }
    create(data): Observable<Usuario> {
        return this.http.post(`${environment.host}${BASEURL}`, data);
    }
    get(id): Observable<Usuario> {
        return this.http.get(`${environment.host}${BASEURL}${id}`);
    }
    update(id, data): Observable<Usuario> {
        return this.http.put(`${environment.host}${BASEURL}${id}`, data);
    }
    delete(id): Observable<Usuario> {
        return this.http.delete(`${environment.host}${BASEURL}${id}`);
    }
    
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Perfil } from '../interfaces';
import { environment } from './../../environments/environment';
import { Sesion } from './../common/sesion';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }
  getAll(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  create(form: { user: string }): Observable<any> {
    const url = `${this.basePath}/api/signup`;
    try {
      const response = this.http.post(url, form, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  addAddress(form: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/direcciones`;
    try {
      const response = this.http.post(url, form, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  delete(id: number): Observable<any> {
    const url = `${this.basePath}/api/users/${id}`;
    try {
      const response = this.http.delete(url);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  update(form: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users/${form.id}`;
    try {
      const response = this.http.put(url, form, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  getSingle(id: number): Observable<Perfil> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users/${id}`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

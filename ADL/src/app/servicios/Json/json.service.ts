import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const BASE_URL = environment.base;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Cache-control': 'no-cache'
  })
};

@Injectable({
  providedIn: 'root'
})


export class JsonService {
  constructor(public http: HttpClient) { }

  obternerProductos(): Observable<any> {
    const partnerUrl = `${BASE_URL}/assets/Json/productos.json`;
    return this.http.get<any>(partnerUrl, httpOptions).pipe(
      catchError( this.catchErrorCallback()));
  }

  guardarPago(producto: any): Observable<any> {
    const partnerUrl = `${BASE_URL}/xxxxxxxx`;
    return this.http.post<any>(partnerUrl, producto, httpOptions).pipe(
      catchError( this.catchErrorCallback()));
  }

  catchErrorCallback(): (err) => any {
    return err => {
      throw new Error('error en json.service: ' + err);
    };
  }
}

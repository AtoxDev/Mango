import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  public urlBase: String
  public ruta: any;
  public headers: any;

  constructor(private http: HttpClient) {
    this.urlBase = 'http://demo5659971.mockable.io/';
    this.headers = HttpHeaders;
  }

  /**
   ** Función para realizar el normal Range
   **/
  public getNormalRange() {
    this.ruta = this.urlBase + 'normalRange';
    this.headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Accept-Language', 'es-ES,es;q=0.8');
    return this.http.get<any>(this.ruta, {observe: 'response', headers: this.headers, responseType: 'json'});
  }

  /**
   ** Función para realizar el Array de Range
   **/
  public getRangeArray() {
    this.ruta = this.urlBase + 'rangeArray';
    this.headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Accept-Language', 'es-ES,es;q=0.8');
    return this.http.get<any>(this.ruta, {observe: 'response', headers: this.headers, responseType: 'json'});
  }

  /**
   ** Función para realizar el FixedRange
   **/
  public getFixedRange() {
    this.ruta = this.urlBase + 'fixedRange';
    this.headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Accept-Language', 'es-ES,es;q=0.8');
    return this.http.get<any>(this.ruta, {observe: 'response', headers: this.headers, responseType: 'json'});
  }
}

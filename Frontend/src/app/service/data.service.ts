import { Injectable } from '@angular/core';



import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Inject } from '@angular/core'

@Injectable()
export class DataService {
  isLogged: boolean = false;
  currentAdmin: any;
  config: any;
  private url;
  private endpoint;
  currentUser: any;
  constructor(@Inject('endPoint') private endPoint: string, @Inject('routeService') private routeService: string, @Inject('http') private http: HttpClient) {

    this.endpoint = endPoint;
    this.url = endPoint + routeService;

    let token = localStorage.getItem('x-auth-token');
    if (token) {

      this.isLogged = true;
    }


  }
  _isLogged() {
    return this.isLogged
  }

  setUrl(segment: string) {
    this.url = this.endPoint + this.routeService + segment;
  }

  login(resource: any, curentUrl: string) {
    this.setUrl(curentUrl);
    return this.http.post(this.url, resource).pipe(map((response) => {
      let result = JSON.parse(JSON.stringify(response));
      if (result) {
        localStorage.setItem('x-auth-token', result.result);
        let jwt = new JwtHelperService();
        this.currentAdmin = jwt.decodeToken(localStorage.getItem('x-auth-token') || '{}');
        this.isLogged = true;
        return true;
      }
      else return false;
    }))

  }

  logout() {
    localStorage.removeItem('x-auth-token');
    this.isLogged = false;
    this.currentAdmin = null;
  }
  insertData(resource: any, curentUrl: string) {
    this.setUrl(curentUrl);
    return this.http.post(this.url, resource)
  }

  getData(url: string): Observable<any> {
    this.setUrl(url);
    return this.http.get(this.url);
  }
  deleteData(id: string, url: string) {
    this.setUrl(url);
    return this.http.delete(this.url + id);
  }

  getCurrentUser() {
    let token = localStorage.getItem('x-auth-token');
    if (!token) return null;
    return new JwtHelperService().decodeToken(token);
  }

  getById(id: string, url: string) {
    this.setUrl(url)
    console.log(this.url + id);
    return this.http.get(this.url + id);
  }

  updateData(data: any, id: string, url: string) {
    this.setUrl(url);
    return this.http.put(this.url + id, data);
  }
}
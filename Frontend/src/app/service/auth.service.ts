import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService  {

  constructor(http: HttpClient) {
    super('http://localhost:3000', '/api/auth', http);
     
  }
}
 
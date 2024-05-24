import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = enviroment.url + '/user'

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.url, data, {observe: 'response'});
  }

  getIdOfTheUserLogged() {
    return localStorage.getItem('userId');
  }
}

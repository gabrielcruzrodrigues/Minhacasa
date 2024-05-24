import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImmobileService {
  readonly url = enviroment.url + '/immobile'

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.url, data, {observe: 'response'});
  }
}

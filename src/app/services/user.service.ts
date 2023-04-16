import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl

  constructor(private htppClient: HttpClient) { }

  signUp(data: any):Observable<any> {
    return this.htppClient.post<any>(this.url + "/user/signup",
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
  }
}

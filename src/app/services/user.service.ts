import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl //endpoint

  constructor(private htppClient: HttpClient) { }

  signUp(data: any):Observable<any> {
    return this.htppClient.post<any>(this.url + "/user/signup",
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
  }

  forgotPassword(data:any):Observable<any>{
    return this.htppClient.post(this.url+"/user/forgotPassword/",data)
  }

  login(data:any):Observable<any>{
    return this.htppClient.post(this.url+"/user/login/",data)
  }

  checkToken():Observable<any>{
    return this.htppClient.get(this.url+"/user/checkToken/")
  }

  changePassword(data:any):Observable<any>{
    return this.htppClient.post(this.url+"/user/changePassword/",data)
  }
}

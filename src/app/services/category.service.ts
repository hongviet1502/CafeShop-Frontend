import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl

  constructor( private httpClient:HttpClient) { }

  addCategory(data:any) :Observable<any>{
    return this.httpClient.post(this.url+"/category/add/",data)
  }

  updateCategory(data:any) :Observable<any>{
    return this.httpClient.post(this.url+"/category/update/",data)
  }

  getCategory(data:any) :Observable<any>{
    return this.httpClient.get(this.url+"/category/get/")
  }
}

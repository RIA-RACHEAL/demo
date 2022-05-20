import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoginStatus:boolean=false;
  
  currentUser;

  constructor(private hc:HttpClient) { }

  loginUser(userCredObj):Observable<any>{
    return this.hc.post('/user/login-user',userCredObj)
  }

  loginAdmin(adminCredObj):Observable<any>{
    return this.hc.post('/admin/login',adminCredObj)
  }


  logoutUser(){
    localStorage.removeItem('token')
    this.userLoginStatus=false;
  }

  logoutAdmin(){
    localStorage.removeItem('token');
    this.userLoginStatus=false;
  }

}

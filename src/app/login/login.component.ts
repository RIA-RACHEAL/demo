import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginDetails:FormGroup;
  errMessage:string;
  errStatus=false;
  
  constructor(private fb:FormBuilder,private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.loginDetails=this.fb.group({
      usertype:['',[Validators.required]],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  onFormSubmit(){
    //console.log(this.loginDetails.value)
    
    //if userType is user
    if(this.usertype.value=='user'){
      this.authService.loginUser(this.loginDetails.value).subscribe({
        next:(res)=>{
          //console.log(res)
          if(res.message=='success'){
            this.errStatus=false;

            //get token from res obj
            let token=res.token;
            //store token in localstorage
            localStorage.setItem("token",token)
            //update user login status
            this.authService.userLoginStatus=true;
            //get loggedin user details
            this.authService.currentUser=res.user;
            //navigate to userdashboard
            this.router.navigateByUrl(`/userprofile/${res.user.username}`)
          }
          else{
            this.errStatus=true;
            this.errMessage=res.message;
          }
        },
        error:(err)=>{
          alert(err.message)
        }
      })
    }

    //if userType is admin
    if(this.usertype.value=='admin'){
      //console.log(this.loginDetails.value);
      this.authService.loginAdmin(this.loginDetails.value).subscribe({
        next:(res)=>{
          if(res.message=='success'){
          this.errStatus=false;
          //get token from res obj
          let token=res.token;
          //store token in localstorage
          localStorage.setItem("token",token)
          
          //update admin login status
          this.authService.userLoginStatus=true;

          //navigate to userdashboard
          this.router.navigateByUrl(`/adminprofile/${res.admin}`)
          }
          else{
            this.errStatus=true;
            this.errMessage=res.message;
          }
        },
        
        error:(err)=>{
          console.log("err is",err.message);
        }
      })

    }

  }

  //getters
  get username(){
    return this.loginDetails.get('username')
  }

  get password(){
    return this.loginDetails.get('password')
  }

  get usertype(){
    return this.loginDetails.get('usertype')
  }
}

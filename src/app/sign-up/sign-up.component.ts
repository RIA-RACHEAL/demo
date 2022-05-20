import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userFormInfo:FormGroup;
  errMessage:string;
  errStatus:boolean=false;
  image:File;

  constructor(private fb:FormBuilder,private us:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    this.userFormInfo=this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      city:['',[Validators.required]],
      email:['',[Validators.required]],
      profilePic:['']
      
    })
  }

  onFormSubmit(){
    //console.log(this.userFormInfo.value.invalid)
    //console.log(this.userObj.value.username)
    //get user obj from form
    let userObj=this.userFormInfo.value;
    //create FormData object
    let formData=new FormData();
    //append userObj to formData
    formData.append('userObj',JSON.stringify(userObj))
    //append profilepic to formData
    formData.append('profilePic',this.image)

    if(userObj.username==""){
      alert('Fill the required fields')
    }
    else{
    this.us.createUser(formData).subscribe({
      next:(res)=>{
        if(res.message=="User created"){
          //navigate by login component
          this.errStatus=false
          alert("User Created Successfully")
          //redirect to login page
          this.router.navigateByUrl('/login')
        }
        else{
          this.errStatus=true;
          this.errMessage=res.message
        }
      },
      error:(err)=>{

      }
    }) 
}
}

  //getters
  get username(){
    return this.userFormInfo.get('username')
  }

  get password(){
    return this.userFormInfo.get('password')
  }

  get email(){
    return this.userFormInfo.get('email')
  }
  get city(){
    return this.userFormInfo.get('city')
  }

  onFileSelect(event){
    // console.log(event.target.files[0]);
    this.image = event.target.files[0]
  }
}

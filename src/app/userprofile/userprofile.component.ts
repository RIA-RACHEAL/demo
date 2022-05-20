import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user;
  constructor(private authService:AuthenticationService,private us:UserserviceService) { }

  ngOnInit(): void {
  this.user=this.authService.currentUser;
  }

  getProtected(){
    this.us.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message)
      }
    })
  }

}

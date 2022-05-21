import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  allProducts;
  user;
  constructor(private authService:AuthenticationService,private us:UserserviceService) { }

  ngOnInit(): void {
  this.user=this.authService.currentUser;
  this.getProducts();
  }

  getProtected(){
    this.us.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message)
      }
    })
  }
  
  private getProducts(){
    this.us.getProduct().subscribe({
      next:(products)=>{
        //console.log(products);
        //console.log("Products",products['payload']);
        this.allProducts=products['payload'];
        //console.log(this.allProducts[0].productName)
      },
      error:(err)=>{
        console.log("err",err);
      }
    })
  }

  addCart(username,cartProuct){
    // console.log("name",username)
    // console.log("Cart",cartProuct);
    let cartObj={
      username:username,
      products:[cartProuct]
    }
    console.log(cartObj);
    this.us.addCart(cartObj).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log("cart error",err)
      }
    })
  }

}

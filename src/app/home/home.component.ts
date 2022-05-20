import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts;
  constructor(private us:UserserviceService) { }

  ngOnInit(): void {
    this.getProducts()
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

}

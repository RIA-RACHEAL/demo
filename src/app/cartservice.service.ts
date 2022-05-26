import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  //create object for BehaviourSubject

  productCountSubject=new BehaviorSubject<any>(0);

 

  //create observable  

  productCountObservable=this.productCountSubject.asObservable();




  //to update value of BahaviourSubject

  updateCartCountObservable(latestCartCount){

    this.productCountSubject.next(latestCartCount)

  }



  getCurrentCartCount(){

    return this.productCountSubject.getValue()

  }
}

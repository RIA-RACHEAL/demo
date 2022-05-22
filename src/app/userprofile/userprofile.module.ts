import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { ViewcartComponent } from './viewcart/viewcart.component';


@NgModule({
  declarations: [
    UserprofileComponent,
    ViewcartComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule
  ]
})
export class UserprofileModule { }

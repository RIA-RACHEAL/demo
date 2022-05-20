import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminprofileRoutingModule } from './adminprofile-routing.module';
import { AdminprofileComponent } from './adminprofile.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminprofileComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminprofileRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminprofileModule { }

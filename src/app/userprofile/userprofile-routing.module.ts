import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile.component';
import { ViewcartComponent } from './viewcart/viewcart.component';

const routes: Routes = [{ path: '', component: UserprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserprofileRoutingModule { }

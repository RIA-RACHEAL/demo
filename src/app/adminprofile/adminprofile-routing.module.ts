import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminprofileComponent } from './adminprofile.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [{ path: '', component: AdminprofileComponent },
{path:'products',component:ProductComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminprofileRoutingModule { }

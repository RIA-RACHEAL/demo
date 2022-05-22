import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewcartComponent } from './userprofile/viewcart/viewcart.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"contact-us",component:ContactUsComponent},
  {path:"login",component:LoginComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"userprofile/viewcart/:username",component:ViewcartComponent},
  { path: 'userprofile/:username', loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserprofileModule) },
  { path: 'adminprofile/:adminname', loadChildren: () => import('./adminprofile/adminprofile.module').then(m => m.AdminprofileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

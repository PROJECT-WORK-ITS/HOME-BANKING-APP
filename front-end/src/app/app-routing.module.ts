import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchComponent } from './components/search/search.component';
import { RicaricaComponent } from './components/ricarica/ricarica.component';
import { BonificoComponent } from './components/bonifico/bonifico.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    canActivate: [notAuthGuard],
    component: RegistrationComponent,
  },
  {
    path: 'login',
    canActivate: [notAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    canActivate: [authGuard],
    component: DetailsComponent,
  },
  {
    path: 'search',
    canActivate: [authGuard],
    component: SearchComponent,
  },
  {
    path: 'ricarica',
    canActivate: [authGuard],
    component: RicaricaComponent,
  },
  {
    path: 'bonifico',
    canActivate: [authGuard],
    component: BonificoComponent,
  },
  {
    path: 'profilo',
    canActivate: [authGuard],
    component: ProfiloComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },

  // {
  //   path: 'login',
  //   component: LoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

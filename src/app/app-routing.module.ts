import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { ChangePassComponent } from './components/pages/change-pass/change-pass.component';
import { LogoutComponent } from './components/logout/logout.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContenidoComponent } from './pages/contenido/contenido.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'change-pass', component: ChangePassComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/:uuid', component: AuthComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'contenido/:slug', component: ContenidoComponent },
  { path: 'dashboard', redirectTo: 'dashboard/information', pathMatch: 'full' },
  { path: 'dashboard/:tipo', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '**', redirectTo: 'information', pathMatch: 'full' }
    ], canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

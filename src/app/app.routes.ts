import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeComponent } from './resume/resume.component';
import { MetasCrudComponent } from './metas-crud/metas-crud.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { GlpiUsersComponent } from './glpi-users/glpi-users.component';
import { GlpiTorresComponent } from './glpi-torres/glpi-torres.component';
import { GlpiTrabajadoresTorreComponent } from './glpi-new-trabajadores-torre/glpi-new-trabajadores-torre.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
  { path: 'resume', component: ResumeComponent , canActivate: [authGuard]},
  { path: 'resume_details/:id', component: ResumeDetailsComponent , canActivate: [authGuard]},
  { path: 'notifications', component: NotificationsComponent , canActivate: [authGuard]},
  { path: 'crud_metas', component: MetasCrudComponent , canActivate: [authGuard]},
  { path: 'users', component: GlpiUsersComponent },
  { path: 'trabajadores-torre', component: GlpiTrabajadoresTorreComponent },
  { path: 'torres', component: GlpiTorresComponent },
  { path: '**', redirectTo: 'login' },
];

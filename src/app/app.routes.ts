import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeComponent } from './resume/resume.component';
import { MetasCrudComponent } from './metas-crud/metas-crud.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'resume_details/:id', component: ResumeDetailsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'crud_metas', component: MetasCrudComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

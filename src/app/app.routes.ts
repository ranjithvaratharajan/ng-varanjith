import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'about-me',
        loadComponent: () =>
          import('./component/about-me/about-me.component').then(
            (m) => m.AboutMeComponent
          ),
      },
      {
        path: 'resume',
        loadComponent: () =>
          import('./component/resume/resume.component').then(
            (m) => m.ResumeComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./component/contact/contact.component').then(
            (m) => m.ContactComponent
        ),
      }
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { authGuard, redirectIfAuthenticatedGuard } from './guard/auth-guard'

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
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./component/portfolio/portfolio').then(m => m.PortfolioComponent),
      },
      { path: 'admin',
        loadComponent: () => import('./component/admin/admin').then(m => m.AdminComponent),
        canActivate: [redirectIfAuthenticatedGuard]
      },
      {
        path: 'admin/dashboard',
        loadComponent: () => import('./component/admin/dashboard/dashboard').then(m => m.AdminDashboardComponent),
        canActivate: [authGuard],
      }
    ],

  },
  {
    path: 'home/portfolio/:id',
    loadComponent: () => import('./component/project-details/project-details').then(m => m.ProjectDetailsComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

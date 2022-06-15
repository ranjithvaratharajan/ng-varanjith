import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutMeComponent } from './component/about-me/about-me.component'
import { ContactComponent } from './component/contact/contact.component'
import { HomeComponent } from './component/home/home.component'
import { PortfolioComponent } from './component/portfolio/portfolio.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'about-me',
        loadChildren: () =>
          import('./component/about-me/about-me.module').then(
            (m) => m.AboutMeModule
          ),
      },
      {
        path: 'resume',
        loadChildren: () =>
          import('./component/resume/resume.module').then(
            (m) => m.ResumeModule
          ),
      },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

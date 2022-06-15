import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ResumeComponent } from './resume.component'
import { EventComponent } from '../helper/event/event.component'
import { ProgressBarComponent } from '../helper/progress-bar/progress-bar.component'
import { TestimonialComponent } from '../helper/testimonial/testimonial.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  },
]

@NgModule({
  declarations: [
    ResumeComponent,
    EventComponent,
    ProgressBarComponent,
    TestimonialComponent,
  ],
  exports: [ResumeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ResumeModule {}

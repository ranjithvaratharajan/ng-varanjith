import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../service/loading';
import { ResumeService, WorkHistory, Education, Skill, Testimonial } from '../../service/resume';
import { ToastrService } from 'ngx-toastr';
import { EventComponent } from '../helper/event/event.component';
import { ProgressBarComponent } from '../helper/progress-bar/progress-bar.component';
import { TestimonialComponent } from '../helper/testimonial/testimonial.component';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [CommonModule, EventComponent, ProgressBarComponent, TestimonialComponent],
  providers: [LoadingService],
})
export class ResumeComponent {
  private resumeService = inject(ResumeService);
  private toastr = inject(ToastrService);
  loading = inject(LoadingService);

  private itemsPerPage = 7;

  // Signals for reactive state
  workHistory = signal<WorkHistory[]>([]);
  eduEvents = signal<Education[]>([]);
  skills = signal<Skill[]>([]);
  testimonials = signal<Testimonial[]>([]);
  currentPage = signal(1);

  // Computed signals for pagination
  totalPages = computed(() => Math.ceil(this.testimonials().length / this.itemsPerPage));

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    forkJoin([
      this.resumeService.getWorkHistory(),
      this.resumeService.getEducation(),
      this.resumeService.getSkills(),
      this.resumeService.getTestimonials(),
    ]).subscribe({
      next: ([workHistory, education, skills, testimonials]) => {
        this.workHistory.set(workHistory);
        this.eduEvents.set(education);
        this.skills.set(skills);
        this.testimonials.set(testimonials);
      },
      error: (err) => {
        this.toastr.error('Failed to load resume data.', 'Error');
        console.error(err);
      }
    });
  }

  downloadCv(): void {
    this.resumeService.downloadCv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.toastr.error('Failed to download CV.', 'Error');
        console.error(err);
      },
    });
  }
}

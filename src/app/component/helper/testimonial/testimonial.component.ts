import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialModel } from 'src/app/model/testimonial.model';

@Component({
  standalone: true,
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
  imports: [CommonModule],
})
export class TestimonialComponent {
  baseUrl: string = 'https://varanjith.com/api/uploads/';
  @Input({ required: true }) testimonial!: TestimonialModel; // Required
}

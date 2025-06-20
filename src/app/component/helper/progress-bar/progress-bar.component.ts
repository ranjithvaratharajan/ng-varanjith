import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModel } from 'src/app/model/progress-bar.model';

@Component({
  standalone: true,
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  imports: [CommonModule],
})
export class ProgressBarComponent {
  @Input({ required: true }) Skillset!: ProgressBarModel; // Renamed, required
}

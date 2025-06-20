import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from 'src/app/model/event.model';

@Component({
  standalone: true,
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  imports: [CommonModule],
})
export class EventComponent {
  @Input({ required: true }) Event!: EventModel; // Non-optional, camelCase
}

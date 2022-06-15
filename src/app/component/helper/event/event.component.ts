import { Component, Input, OnInit } from '@angular/core'
import { EventModel } from 'src/app/model/event.model'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event?: EventModel
  constructor() {}
  ngOnInit() {}
}

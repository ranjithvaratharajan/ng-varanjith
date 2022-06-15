import { Component, OnInit } from '@angular/core'
import { HomeService } from './service/home.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VaRanjith - Design is passion | Code is poetry'

  isCardOpen = false
  isSectionOpen = false

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.isCardOpen.subscribe((data) => (this.isCardOpen = data))
    this.homeService.isSectionOpen.subscribe(
      (data) => (this.isSectionOpen = data)
    )
  }
}

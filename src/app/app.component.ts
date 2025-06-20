import { Component, signal, inject, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeService } from './service/home.service';
import { NgClass } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NgClass],
})
export class AppComponent {
  // Signals for component state
  title = signal('VaRanjith - Design is passion | Code is poetry')
  isMobile = signal(false)

  // Inject service
  private homeService = inject(HomeService)

  // Access service signals directly
  isCardOpen = this.homeService.isCardOpen
  isSectionOpen = this.homeService.isSectionOpen

  constructor() {
    afterNextRender(() => {
      // Initialize mobile state
      this.isMobile.set(this.homeService.isMobile())
    })
  }
}

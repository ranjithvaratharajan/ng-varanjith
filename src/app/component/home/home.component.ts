import { Component, signal, inject, ViewChild, ViewContainerRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { SoundService } from 'src/app/service/sound.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, RouterModule, RouterOutlet],
})
export class HomeComponent {
  // Signals for component state
  isCloseFocus = signal(false);
  currentYear = signal(new Date().getFullYear());

  // Inject dependencies
  private router = inject(Router);
  private homeService = inject(HomeService);
  private soundService = inject(SoundService);

  // Access service signals directly
  isCardOpen = this.homeService.isCardOpen;
  isSectionOpen = this.homeService.isSectionOpen;

  // ViewChild for sectionContainer (if used)
  @ViewChild('sectionContainer', { static: true, read: ViewContainerRef })
  sectionEntry?: ViewContainerRef;
  navLinks = [
    { path: 'about-me', label: 'About Me', icon: 'pw-icon-user' },
    { path: 'resume', label: 'Resume', icon: 'pw-icon-vcard' },
    { path: 'contact', label: 'Contact', icon: 'pw-icon-at' },
    { path: 'portfolio', label: 'Portfolio', icon: 'pw-icon-lightbulb' },
  ];

  constructor() {
    afterNextRender(() => {
      // Initialize based on current route
      const section = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
      if (['about-me', 'resume', 'portfolio', 'contact'].includes(section)) {
        this.homeService.setCardStatus(true);
        this.homeService.setSectionStatus(true);
      }
    });
  }

  openCard() {
    this.soundService.play('wind');
    this.homeService.setCardStatus(true);
  }

  closeCard() {
    this.soundService.play('revWind');
    this.homeService.setCardStatus(false);
    this.homeService.setSectionStatus(false);
    this.router.navigate(['home']);
  }

  onCloseFocus(status: boolean) {
    this.isCloseFocus.set(status);
  }

  openSection() {
    this.soundService.play('tick');
    this.homeService.setSectionStatus(true);
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

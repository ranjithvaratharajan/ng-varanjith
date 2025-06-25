import { Component, inject, signal, ViewContainerRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeService } from '../../service/home.service';
import { SoundService } from '../../service/sound.service';
import { LoadingDirective } from '../../directive/loading'

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, RouterModule, RouterOutlet, LoadingDirective],
})
export class HomeComponent {
  private router = inject(Router)
  private homeService = inject(HomeService)
  private soundService = inject(SoundService)

  isCardOpen = this.homeService.isCardOpen
  isSectionOpen = this.homeService.isSectionOpen
  profile = this.homeService.profile
  navLinks = this.homeService.navLinks
  error = this.homeService.error

  isCloseFocus = signal<boolean>(false)
  currentYear = signal<number>(new Date().getFullYear())

  sectionEntry?: ViewContainerRef

  constructor() {
    afterNextRender(() => {
      const section = this.router.url.substring(
        this.router.url.lastIndexOf('/') + 1
      )
      if (['about-me', 'resume', 'portfolio', 'contact'].includes(section)) {
        this.homeService.setCardStatus(true)
        this.homeService.setSectionStatus(true)
      }
    })
  }

  openCard() {
    this.soundService.play('wind')
    this.homeService.setCardStatus(true)
  }

  closeCard() {
    this.soundService.play('revWind')
    this.homeService.setCardStatus(false)
    this.homeService.setSectionStatus(false)
    this.router.navigate(['home'])
  }

  onCloseFocus(status: boolean) {
    this.isCloseFocus.set(status)
  }

  openSection() {
    this.soundService.play('tick')
    this.homeService.setSectionStatus(true)
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  downloadCv() {
    const cvUrl = this.profile()?.cv_file_url
    if (cvUrl) {
      window.open(cvUrl, '_blank')
    } else {
      this.soundService.play('tick')
    }
  }

  retryLoadProfile() {
    this.homeService.retryLoadProfile()
  }
}

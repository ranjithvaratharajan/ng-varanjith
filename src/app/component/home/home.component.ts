import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs/internal/Subject'
import { takeUntil } from 'rxjs/internal/operators/takeUntil'
import { HomeService } from 'src/app/service/home.service'
import { SoundService } from 'src/app/service/sound.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isCardOpen = false
  isCloseFocus = false
  homeData: any
  currentYear?: number
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('sectionContainer', { static: true, read: ViewContainerRef })
  sectionEntry?: ViewContainerRef
  constructor(
    private router: Router,
    private soundService: SoundService,
    private homeService: HomeService
  ) {

  }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    
    this.homeService.isCardOpen
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isCardOpen = data;
      });
    let section = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    )

    setTimeout(() => {
      if (
        section === 'about-me' ||
        section === 'resume' ||
        section === 'portfolio' ||
        section === 'contact'
      ) {
        this.homeService.setCardStatus(true)
        this.homeService.setSectionStatus(true)
      }
    }, 0)
  }
  openCard() {
    this.soundService.wind.play()
    this.homeService.setCardStatus(true)
  }
  closeCard() {
    this.soundService.revWind.play()
    this.homeService.setCardStatus(false)
    this.homeService.setSectionStatus(false)
    this.router.navigate(['home'])
  }
  onCloseFocus(status: boolean) {
    this.isCloseFocus = status
  }
  openSection() {
    this.soundService.tick.play()
    this.homeService.isSectionOpen.next(true)
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

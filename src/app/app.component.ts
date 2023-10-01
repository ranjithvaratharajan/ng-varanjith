import { Component, OnInit } from '@angular/core'
import { HomeService } from './service/home.service'
import { Subject } from 'rxjs/internal/Subject'
import { takeUntil } from 'rxjs/internal/operators/takeUntil'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VaRanjith - Design is passion | Code is poetry'

  isCardOpen = false
  isSectionOpen = false
  private destroy$: Subject<void> = new Subject<void>()

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.isCardOpen
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.isCardOpen = data));

    this.homeService.isSectionOpen
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.isSectionOpen = data));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

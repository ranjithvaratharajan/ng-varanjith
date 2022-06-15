import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
declare var NProgress: any
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe({
      next(event) {
        if (event instanceof NavigationStart) {
          NProgress.start()
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          NProgress.done()
        }
      },
      error() {
        NProgress.done()
      },
      complete() {
        NProgress.done()
      },
    })
  }

  ngOnDestroy(): void {
    NProgress.remove()
  }

  ngOnInit(): void {}
}

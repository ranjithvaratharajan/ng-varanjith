import { Directive, ElementRef, inject, effect } from '@angular/core';
import { LoadingService } from '../service/loading'

@Directive({
  selector: '[appLoading]',
  standalone: true,
})
export class LoadingDirective {
  private loadingService = inject(LoadingService);
  private element = inject(ElementRef).nativeElement as HTMLElement;

  constructor() {
    effect(() => {
      const isLoading = this.loadingService.isLoading();
      this.element.classList.toggle('is-loading', isLoading);
      this.element.classList.toggle('is-loaded', !isLoading);
    });
  }
}

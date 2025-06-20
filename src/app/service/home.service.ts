import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // Signals for reactive state
  isCardOpen = signal<boolean>(false);
  isSectionOpen = signal<boolean>(false);

  constructor() {}

  setCardStatus(status: boolean) {
    this.isCardOpen.set(status);
  }

  setSectionStatus(status: boolean) {
    this.isSectionOpen.set(status);
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}

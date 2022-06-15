import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  isCardOpen = new BehaviorSubject<boolean>(false)
  isSectionOpen = new BehaviorSubject<boolean>(false)
  constructor() {}

  setCardStatus(status: boolean) {
    this.isCardOpen.next(status)
  }

  setSectionStatus(status: boolean) {
    this.isSectionOpen.next(status)
  }
}

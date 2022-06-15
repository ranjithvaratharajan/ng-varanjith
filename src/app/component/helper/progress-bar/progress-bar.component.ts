import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { ProgressBarModel } from 'src/app/model/progress-bar.model'

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements AfterContentChecked {
  @Input() skillset: ProgressBarModel = {
    percentage: 0,
    title: '',
  }
  percentage: number = 0

  constructor() {}

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.percentage = this.skillset.percentage
    }, 100)
  }
}

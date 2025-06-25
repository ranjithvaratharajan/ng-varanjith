import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { LoadingService } from '../../service/loading';
import { AboutMeService, AboutMeDescription, Service, WorkProcess, Client } from '../../service/about-me';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  imports: [CommonModule],
  providers: [LoadingService],
})
export class AboutMeComponent {
  private aboutMeService = inject(AboutMeService)
  private toastr = inject(ToastrService)
  loading = inject(LoadingService)

  // Signals for dynamic data
  description = signal<AboutMeDescription>({ content: '[]' })
  services = signal<Service[]>([])
  workProcess = signal<WorkProcess[]>([])
  clients = signal<Client[]>([])

  constructor() {
    this.loadData()
  }

  private loadData(): void {
    forkJoin([
      this.aboutMeService.getDescription(),
      this.aboutMeService.getServices(),
      this.aboutMeService.getWorkProcess(),
      this.aboutMeService.getClients(),
    ]).subscribe({
      next: ([description, services, workProcess, clients]) => {
        this.description.set(description)
        this.services.set(services)
        this.workProcess.set(workProcess)
        this.clients.set(
          clients.map((client) => ({ id: client.id, image: client.image }))
        ) // Map to match template
      },
      error: (err) => {
        this.toastr.error('Failed to load About Me data.', 'Error')
        console.error(err)
      },
    })
  }

  protected readonly JSON = JSON
}

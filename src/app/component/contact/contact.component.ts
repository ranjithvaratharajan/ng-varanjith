import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  class: string;
}

interface ContactInfo {
  id: number;
  icon: string;
  text: string;
}

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [CommonModule],
})
export class ContactComponent {
  private http = inject(HttpClient);
  private baseUrl = 'https://varanjith.com/api';

  // Signals for data
  socialLinks = signal<SocialLink[]>([]);
  contactInfo = signal<ContactInfo[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<SocialLink[]>(`${this.baseUrl}/contact.php?resource=social_links`).subscribe({
      next: (data) => this.socialLinks.set(data),
      error: (err) => {
        this.error.set('Failed to load social links');
        console.error(err);
      },
      complete: () => {
        this.http.get<ContactInfo[]>(`${this.baseUrl}/contact.php?resource=contact_info`).subscribe({
          next: (data) => this.contactInfo.set(data),
          error: (err) => {
            this.error.set('Failed to load contact info');
            console.error(err);
          },
          complete: () => this.loading.set(false),
        });
      },
    });
  }
}

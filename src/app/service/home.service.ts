import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Profile {
  id?: number;
  name: string;
  tagline: string;
  description: string;
  profile_image_url?: string;
  cv_file_url?: string;
}

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private baseUrl = 'https://api.varanjith.com';

  // Signals
  isCardOpen = signal<boolean>(false);
  isSectionOpen = signal<boolean>(false);
  profile = signal<Profile | null>(null);
  navLinks = signal<NavLink[]>([
    { path: 'about-me', label: 'About Me', icon: 'pw-icon-user' },
    { path: 'resume', label: 'Resume', icon: 'pw-icon-vcard' },
    { path: 'contact', label: 'Contact', icon: 'pw-icon-at' },
    //{ path: 'portfolio', label: 'Portfolio', icon: 'pw-icon-lightbulb' },
    { path: 'admin', label: 'Admin', icon: 'pw-icon-lock' },
  ]);
  error = signal<string | null>(null);

  constructor() {
    this.loadProfile();
  }

  setCardStatus(status: boolean) {
    this.isCardOpen.set(status);
  }

  setSectionStatus(status: boolean) {
    this.isSectionOpen.set(status);
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private loadProfile() {
    this.http.get<Profile>(`${this.baseUrl}/profile`).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to load profile data.');
        this.toastr.error('Failed to load profile data.', 'Error');
        console.error(err);
      },
    });
  }

  retryLoadProfile() {
    this.error.set(null);
    this.loadProfile();
  }
}

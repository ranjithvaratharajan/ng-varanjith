import { Component, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../service/loading';
import { AboutMeService, AboutMeDescription, Service, WorkProcess, Client } from '../../../service/about-me';
import { ResumeService, WorkHistory, Education, Skill, Testimonial } from '../../../service/resume';
import { forkJoin } from 'rxjs';

interface Profile {
  id?: number;
  name: string;
  tagline: string;
  description: string;
  profile_image_url?: string;
  cv_file_url?: string;
}

interface SocialLink {
  id?: number;
  platform: string;
  url: string;
  class: string;
}

interface ContactInfo {
  id?: number;
  icon: string;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdminDashboardComponent {
  // Dependencies
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private aboutMeService = inject(AboutMeService);
  private resumeService = inject(ResumeService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  // Signals
  activeTab = signal<string>('home');
  profile = signal<Profile>({ name: '', tagline: '', description: '', profile_image_url: '', cv_file_url: '' });
  profileImageFile = signal<File | null>(null);
  cvFile = signal<File | null>(null);
  socialLinks = signal<SocialLink[]>([]);
  contactInfo = signal<ContactInfo[]>([]);
  editingSocialLink = signal<SocialLink | null>(null);
  editingContactInfo = signal<ContactInfo | null>(null);
  contactDataLoaded = signal<boolean>(false);

  // About Me Signals
  description = signal<AboutMeDescription>({ content: '[]' });
  services = signal<Service[]>([]);
  workProcess = signal<WorkProcess[]>([]);
  clients = signal<Client[]>([]);
  editingService = signal<Service | null>(null);
  editingWorkProcess = signal<WorkProcess | null>(null);
  editingClient = signal<Client | null>(null);
  serviceIconFile = signal<File | null>(null);
  workProcessIconFile = signal<File | null>(null);
  clientImageFile = signal<File | null>(null);
  aboutMeDataLoaded = signal<boolean>(false);

  // Resume Signals
  workHistory = signal<WorkHistory[]>([]);
  eduEvents = signal<Education[]>([]);
  skills = signal<Skill[]>([]);
  testimonials = signal<Testimonial[]>([]);
  editingWorkHistory = signal<WorkHistory | null>(null);
  editingEducation = signal<Education | null>(null);
  editingSkill = signal<Skill | null>(null);
  editingTestimonial = signal<Testimonial | null>(null);
  testimonialImageFile = signal<File | null>(null);
  resumeDataLoaded = signal<boolean>(false);

  // Reactive Forms
  profileForm = this.fb.group({
    name: ['', Validators.required],
    tagline: ['', Validators.required],
    description: ['', Validators.required],
  });

  socialLinkForm = this.fb.group({
    platform: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    class: ['', Validators.required],
  });

  contactInfoForm = this.fb.group({
    icon: ['', Validators.required],
    text: ['', Validators.required],
  });

  descriptionForm = this.fb.group({
    content: ['', Validators.required],
  });

  serviceForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  workProcessForm = this.fb.group({
    title: ['', Validators.required],
  });

  clientForm = this.fb.group({
    image: [''],
  });

  workHistoryForm = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    title: ['', Validators.required],
    company: ['', Validators.required],
    description: ['', Validators.required],
  });

  educationForm = this.fb.group({
    startYear: ['', Validators.required],
    endYear: ['', Validators.required],
    title: ['', Validators.required], // Capitalized
    name: ['', Validators.required], // Capitalized
    percentage: ['', Validators.required],
    class: ['', Validators.required],
  });

  skillForm = this.fb.group({
    title: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  testimonialForm = this.fb.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    image: [''],
    comments: ['', Validators.required],
  });

  loading = inject(LoadingService);

  // Computed signals
  hasProfile = computed(() => !!this.profile().id);
  hasDescription = computed(() => !!this.description().id);

  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
  ];

  private baseUrl = 'https://api.varanjith.com';

  constructor() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home/admin-login']);
    } else {
      this.loadProfile();
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    if (tab === 'about-me' && !this.aboutMeDataLoaded()) {
      this.loadAboutMeData();
    } else if (tab === 'resume' && !this.resumeDataLoaded()) {
      this.loadResumeData();
    } else if (tab === 'contact' && !this.contactDataLoaded()) {
      this.loadContactData();
    }
  }

  loadContactData(): void {
    if (this.contactDataLoaded()) return;
    forkJoin([
      this.http.get<SocialLink[]>(`${this.baseUrl}/contact.php?resource=social_links`),
      this.http.get<ContactInfo[]>(`${this.baseUrl}/contact.php?resource=contact_info`),
    ]).subscribe({
      next: ([socialLinks, contactInfo]) => {
        this.socialLinks.set(socialLinks);
        this.contactInfo.set(contactInfo);
        this.contactDataLoaded.set(true);
      },
      error: (err) => {
        this.toastr.error('Failed to load contact data.', 'Error');
        console.error(err);
      },
    });
  }

  saveSocialLink(): void {
    if (this.socialLinkForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    const socialLink: SocialLink = {
      id: this.editingSocialLink()?.id,
      ...this.socialLinkForm.value,
    } as any;
    const method = socialLink.id ? 'put' : 'post';
    this.http[method](`${this.baseUrl}/contact.php?resource=social_links`, socialLink).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message || 'Social link saved successfully', 'Success');
        this.socialLinks.update(links => {
          if (socialLink.id) {
            return links.map(l => (l.id === socialLink.id ? socialLink : l));
          }
          return [...links, { ...socialLink, id: response.id }];
        });
        this.socialLinkForm.reset();
        this.editingSocialLink.set(null);
        this.contactDataLoaded.set(false);
      },
      error: (err) => this.toastr.error(err.error?.error || 'Failed to save social link', 'Error'),
    });
  }

  editSocialLink(link: SocialLink): void {
    this.editingSocialLink.set(link);
    this.socialLinkForm.patchValue(link);
  }

  cancelEditSocialLink(): void {
    this.editingSocialLink.set(null);
    this.socialLinkForm.reset();
  }

  deleteSocialLink(id: number): void {
    if (confirm('Are you sure you want to delete this social link?')) {
      this.http.delete(`${this.baseUrl}/contact.php?resource=social_links`, { body: { id } }).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Social link deleted successfully', 'Success');
          this.socialLinks.update(links => links.filter(l => l.id !== id));
          this.contactDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete social link', 'Error'),
      });
    }
  }

  saveContactInfo(): void {
    if (this.contactInfoForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    const contactInfo: ContactInfo = {
      id: this.editingContactInfo()?.id,
      ...this.contactInfoForm.value,
    } as any;
    const method = contactInfo.id ? 'put' : 'post';
    this.http[method](`${this.baseUrl}/contact.php?resource=contact_info`, contactInfo).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message || 'Contact info saved successfully', 'Success');
        this.contactInfo.update(info => {
          if (contactInfo.id) {
            return info.map(i => (i.id === contactInfo.id ? contactInfo : i));
          }
          return [...info, { ...contactInfo, id: response.id }];
        });
        this.contactInfoForm.reset();
        this.editingContactInfo.set(null);
        this.contactDataLoaded.set(false);
      },
      error: (err) => this.toastr.error(err.error?.error || 'Failed to save contact info', 'Error'),
    });
  }

  editContactInfo(info: ContactInfo): void {
    this.editingContactInfo.set(info);
    this.contactInfoForm.patchValue(info);
  }

  cancelEditContactInfo(): void {
    this.editingContactInfo.set(null);
    this.contactInfoForm.reset();
  }

  deleteContactInfo(id: number): void {
    if (confirm('Are you sure you want to delete this contact info?')) {
      this.http.delete(`${this.baseUrl}/contact.php?resource=contact_info`, { body: { id } }).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Contact info deleted successfully', 'Success');
          this.contactInfo.update(info => info.filter(i => i.id !== id));
          this.contactDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete contact info', 'Error'),
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home/admin']);
  }

  loadProfile(): void {
    this.http.get<Profile>(`${this.baseUrl}/profile.php`).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.profileForm.patchValue({
          name: data.name,
          tagline: data.tagline,
          description: data.description,
        });
      },
      error: (err) => {
        this.toastr.error('Failed to load profile data.', 'Error');
        console.error(err);
      }
    });
  }

  loadAboutMeData(): void {
    forkJoin([
      this.aboutMeService.getDescription(),
      this.aboutMeService.getServices(),
      this.aboutMeService.getWorkProcess(),
      this.aboutMeService.getClients(),
    ]).subscribe({
      next: ([description, services, workProcess, clients]) => {
        this.description.set(description);
        this.descriptionForm.patchValue({ content: JSON.parse(description.content).join('\n') });
        this.services.set(services);
        this.workProcess.set(workProcess);
        this.clients.set(clients);
        this.aboutMeDataLoaded.set(true);
      },
      error: (err) => {
        this.toastr.error('Failed to load About Me data.', 'Error');
        console.error(err);
      }
    });
  }

  loadResumeData(): void {
    forkJoin([
      this.resumeService.getWorkHistory(),
      this.resumeService.getEducation(),
      this.resumeService.getSkills(),
      this.resumeService.getTestimonials(),
    ]).subscribe({
      next: ([workHistory, education, skills, testimonials]) => {
        this.workHistory.set(workHistory);
        this.eduEvents.set(education);
        this.skills.set(skills);
        this.testimonials.set(testimonials);
        this.resumeDataLoaded.set(true);
      },
      error: (err) => {
        this.toastr.error('Failed to load resume data.', 'Error');
        console.error(err);
      }
    });
  }

  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImageFile.set(input.files[0]);
    }
  }

  onCvFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cvFile.set(input.files[0]);
    }
  }

  onServiceIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.serviceIconFile.set(input.files[0]);
    }
  }

  onWorkProcessIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.workProcessIconFile.set(input.files[0]);
    }
  }

  onClientImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.clientImageFile.set(input.files[0]);
    }
  }

  onTestimonialImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.testimonialImageFile.set(input.files[0]);
    }
  }

  async saveProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const updatedProfile: any = { ...this.profile(), ...this.profileForm.value };
      if (this.profileImageFile()) {
        updatedProfile.profile_image_url = (await this.aboutMeService.uploadFile(this.profileImageFile()!).toPromise())!.url;
        this.profileImageFile.set(null);
      }
      if (this.cvFile()) {
        updatedProfile.cv_file_url = (await this.aboutMeService.uploadFile(this.cvFile()!).toPromise())!.url;
        this.cvFile.set(null);
      }
      if (this.profile().id) {
        this.http.put(`${this.baseUrl}/profile.php`, updatedProfile).subscribe({
          next: (response: any) => {
            this.toastr.success(response.message || 'Profile updated successfully', 'Success');
            this.profile.set({ ...updatedProfile, id: this.profile().id });
          },
          error: (err) => this.toastr.error(err.error?.error || 'Failed to update profile', 'Error'),
        });
      } else {
        this.http.post(`${this.baseUrl}/profile.php`, updatedProfile).subscribe({
          next: (response: any) => {
            this.toastr.success(response.message || 'Profile created successfully', 'Success');
            this.profile.set({ ...updatedProfile, id: response.id });
          },
          error: (err) => this.toastr.error(err.error?.error || 'Failed to create profile', 'Error'),
        });
      }
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to upload files', 'Error');
    }
  }

  deleteProfile(): void {
    if (!this.profile().id) return;
    if (confirm('Are you sure you want to delete this profile?')) {
      this.http.delete(`${this.baseUrl}/profile.php`, { body: { id: this.profile().id } }).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Profile deleted successfully', 'Success');
          this.profile.set({ name: '', tagline: '', description: '', profile_image_url: '', cv_file_url: '' });
          this.profileForm.reset();
        },
        error: (err) => {
          this.toastr.error(err.error?.error || 'Failed to delete profile', 'Error');
          console.error(err);
        },
      });
    }
  }

  async saveDescription(): Promise<void> {
    if (this.descriptionForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    const content = this.descriptionForm.value.content!.split('\n').filter(p => p.trim());
    const description: AboutMeDescription = {
      id: this.description().id,
      content: JSON.stringify(content),
    };
    this.aboutMeService.saveDescription(description).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message || 'Description saved successfully', 'Success');
        this.description.set({ ...description, id: response.id || this.description().id });
        this.aboutMeDataLoaded.set(false); // Refresh data on next tab visit
      },
      error: (err) => this.toastr.error(err.error?.error || 'Failed to save description', 'Error'),
    });
  }

  deleteDescription(): void {
    if (!this.description().id) return;
    if (confirm('Are you sure you want to delete this description?')) {
      this.aboutMeService.deleteDescription(this.description().id!).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Description deleted successfully', 'Success');
          this.description.set({ content: '[]' });
          this.descriptionForm.reset();
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => {
          this.toastr.error(err.error?.error || 'Failed to delete description', 'Error');
          console.error(err);
        },
      });
    }
  }

  async saveService(): Promise<void> {
    if (this.serviceForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const service: any = {
        id: this.editingService()?.id,
        ...this.serviceForm.value,
        icon: this.editingService()?.icon || '',
      };
      if (this.serviceIconFile()) {
        service.icon = (await this.aboutMeService.uploadFile(this.serviceIconFile()!).toPromise())!.url.split('/').pop()!;
        this.serviceIconFile.set(null);
      }
      this.aboutMeService.saveService(service).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Service saved successfully', 'Success');
          this.services.update(services => {
            if (service.id) {
              return services.map(s => (s.id === service.id ? service : s));
            }
            return [...services, { ...service, id: response.id }];
          });
          this.serviceForm.reset();
          this.editingService.set(null);
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save service', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to upload icon', 'Error');
    }
  }

  editService(service: Service): void {
    this.editingService.set(service);
    this.serviceForm.patchValue({
      title: service.title,
      description: service.description,
    });
  }

  cancelEditService(): void {
    this.editingService.set(null);
    this.serviceForm.reset();
    this.serviceIconFile.set(null);
  }

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.aboutMeService.deleteService(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Service deleted successfully', 'Success');
          this.services.update(services => services.filter(s => s.id !== id));
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete service', 'Error'),
      });
    }
  }

  async saveWorkProcess(): Promise<void> {
    if (this.workProcessForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const process: any = {
        id: this.editingWorkProcess()?.id,
        ...this.workProcessForm.value,
        icon: this.editingWorkProcess()?.icon || '',
      };
      if (this.workProcessIconFile()) {
        process.icon = (await this.aboutMeService.uploadFile(this.workProcessIconFile()!).toPromise())!.url.split('/').pop()!;
        this.workProcessIconFile.set(null);
      }
      this.aboutMeService.saveWorkProcess(process).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Work process saved successfully', 'Success');
          this.workProcess.update(processes => {
            if (process.id) {
              return processes.map(p => (p.id === process.id ? process : p));
            }
            return [...processes, { ...process, id: response.id }];
          });
          this.workProcessForm.reset();
          this.editingWorkProcess.set(null);
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save work process', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to upload icon', 'Error');
    }
  }

  editWorkProcess(process: WorkProcess): void {
    this.editingWorkProcess.set(process);
    this.workProcessForm.patchValue({ title: process.title });
  }

  cancelEditWorkProcess(): void {
    this.editingWorkProcess.set(null);
    this.workProcessForm.reset();
    this.workProcessIconFile.set(null);
  }

  deleteWorkProcess(id: number): void {
    if (confirm('Are you sure you want to delete this work process?')) {
      this.aboutMeService.deleteWorkProcess(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Work process deleted successfully', 'Success');
          this.workProcess.update(processes => processes.filter(p => p.id !== id));
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete work process', 'Error'),
      });
    }
  }

  async saveClient(): Promise<void> {
    if (!this.clientImageFile() && !this.editingClient()?.id) {
      this.toastr.error('Please select an image.', 'Error');
      return;
    }
    try {
      const client: Client = {
        id: this.editingClient()?.id,
        image: this.editingClient()?.image || '',
      };
      if (this.clientImageFile()) {
        client.image = (await this.aboutMeService.uploadFile(this.clientImageFile()!).toPromise())!.url.split('/').pop()!;
        this.clientImageFile.set(null);
      }
      this.aboutMeService.saveClient(client).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Client saved successfully', 'Success');
          this.clients.update(clients => {
            if (client.id) {
              return clients.map(c => (c.id === client.id ? client : c));
            }
            return [...clients, { ...client, id: response.id }];
          });
          this.clientForm.reset();
          this.editingClient.set(null);
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save client', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to upload image', 'Error');
    }
  }

  editClient(client: Client): void {
    this.editingClient.set(client);
    this.clientForm.patchValue({ image: '' });
  }

  cancelEditClient(): void {
    this.editingClient.set(null);
    this.clientForm.reset();
    this.clientImageFile.set(null);
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.aboutMeService.deleteClient(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Client deleted successfully', 'Success');
          this.clients.update(clients => clients.filter(c => c.id !== id));
          this.aboutMeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete client', 'Error'),
      });
    }
  }

  async saveWorkHistory(): Promise<void> {
    if (this.workHistoryForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const workHistory: WorkHistory = {
        id: this.editingWorkHistory()?.id,
        ...this.workHistoryForm.value,
      } as any;
      this.resumeService.saveWorkHistory(workHistory).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Work history saved successfully', 'Success');
          this.workHistory.update(items => {
            if (workHistory.id) {
              return items.map(item => (item.id === workHistory.id ? workHistory : item));
            }
            return [...items, { ...workHistory, id: response.id }];
          });
          this.workHistoryForm.reset();
          this.editingWorkHistory.set(null);
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save work history', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to save work history', 'Error');
    }
  }

  editWorkHistory(job: WorkHistory): void {
    this.editingWorkHistory.set(job);
    this.workHistoryForm.patchValue(job);
  }

  cancelEditWorkHistory(): void {
    this.editingWorkHistory.set(null);
    this.workHistoryForm.reset();
  }

  deleteWorkHistory(id: number): void {
    if (confirm('Are you sure you want to delete this work history?')) {
      this.resumeService.deleteWorkHistory(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Work history deleted successfully', 'Success');
          this.workHistory.update(items => items.filter(item => item.id !== id));
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete work history', 'Error'),
      });
    }
  }

  async saveEducation(): Promise<void> {
    if (this.educationForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const education: Education = {
        id: this.editingEducation()?.id,
        startYear: this.educationForm.value.startYear!,
        endYear: this.educationForm.value.endYear!,
        title: this.educationForm.value.title!, // Capitalized
        name: this.educationForm.value.name!, // Capitalized
        percentage: this.educationForm.value.percentage!,
        class: this.educationForm.value.class!,
      };
      this.resumeService.saveEducation(education).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Education saved successfully', 'Success');
          this.eduEvents.update(items => {
            if (education.id) {
              return items.map(item => (item.id === education.id ? education : item));
            }
            return [...items, { ...education, id: response.id }];
          });
          this.educationForm.reset();
          this.editingEducation.set(null);
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save education', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to save education', 'Error');
    }
  }

  editEducation(edu: Education): void {
    this.editingEducation.set(edu);
    this.educationForm.patchValue({
      startYear: edu.startYear,
      endYear: edu.endYear,
      title: edu.title, // Capitalized
      name: edu.name, // Capitalized
      percentage: edu.percentage,
      class: edu.class,
    });
  }

  cancelEditEducation(): void {
    this.editingEducation.set(null);
    this.educationForm.reset();
  }

  deleteEducation(id: number): void {
    if (confirm('Are you sure you want to delete this education record?')) {
      this.resumeService.deleteEducation(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Education deleted successfully', 'Success');
          this.eduEvents.update(items => items.filter(item => item.id !== id));
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete education', 'Error'),
      });
    }
  }

  async saveSkill(): Promise<void> {
    if (this.skillForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    try {
      const skill: Skill = {
        id: this.editingSkill()?.id,
        ...this.skillForm.value,
        percentage: parseInt(this.skillForm.value.percentage as string, 10),
      } as any;
      this.resumeService.saveSkill(skill).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Skill saved successfully', 'Success');
          this.skills.update(items => {
            if (skill.id) {
              return items.map(item => (item.id === skill.id ? skill : item));
            }
            return [...items, { ...skill, id: response.id }];
          });
          this.skillForm.reset();
          this.editingSkill.set(null);
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save skill', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to save skill', 'Error');
    }
  }

  editSkill(skill: Skill): void {
    this.editingSkill.set(skill);
    this.skillForm.patchValue(skill as any);
  }

  cancelEditSkill(): void {
    this.editingSkill.set(null);
    this.skillForm.reset();
  }

  deleteSkill(id: number): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.resumeService.deleteSkill(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Skill deleted successfully', 'Success');
          this.skills.update(items => items.filter(item => item.id !== id));
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete skill', 'Error'),
      });
    }
  }

  async saveTestimonial(): Promise<void> {
    if (this.testimonialForm.invalid && !this.testimonialImageFile() && !this.editingTestimonial()?.id) {
      this.toastr.error('Please fill all required fields and select an image.', 'Error');
      return;
    }
    try {
      const testimonial: Testimonial = {
        id: this.editingTestimonial()?.id,
        ...this.testimonialForm.value,
        image: this.editingTestimonial()?.image || '',
      } as any;
      if (this.testimonialImageFile()) {
        testimonial.image = (await this.resumeService.uploadFile(this.testimonialImageFile()!).toPromise())!.url.split('/').pop()!;
        this.testimonialImageFile.set(null);
      }
      this.resumeService.saveTestimonial(testimonial).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Testimonial saved successfully', 'Success');
          this.testimonials.update(items => {
            if (testimonial.id) {
              return items.map(item => (item.id === testimonial.id ? testimonial : item));
            }
            return [...items, { ...testimonial, id: response.id }];
          });
          this.testimonialForm.reset();
          this.editingTestimonial.set(null);
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to save testimonial', 'Error'),
      });
    } catch (err: any) {
      this.toastr.error(err.message || 'Failed to upload image', 'Error');
    }
  }

  editTestimonial(testimonial: Testimonial): void {
    this.editingTestimonial.set(testimonial);
    this.testimonialForm.patchValue(testimonial);
  }

  cancelEditTestimonial(): void {
    this.editingTestimonial.set(null);
    this.testimonialForm.reset();
    this.testimonialImageFile.set(null);
  }

  deleteTestimonial(id: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.resumeService.deleteTestimonial(id).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message || 'Testimonial deleted successfully', 'Success');
          this.testimonials.update(items => items.filter(item => item.id !== id));
          this.resumeDataLoaded.set(false);
        },
        error: (err) => this.toastr.error(err.error?.error || 'Failed to delete testimonial', 'Error'),
      });
    }
  }
}

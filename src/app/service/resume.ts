import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface WorkHistory {
  id?: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string;
}

export interface Education {
  id?: number;
  startYear: string;
  endYear: string;
  title: string;
  name: string;
  percentage: string;
  class: string;
}

export interface Skill {
  id?: number;
  title: string;
  percentage: number;
}

export interface Testimonial {
  id?: number;
  name: string;
  position: string;
  image: string;
  comments: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.varanjith.com/resume';

  getWorkHistory(): Observable<WorkHistory[]> {
    return this.http.get<WorkHistory[]>(`${this.baseUrl}/work-history`);
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}/education`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/skills`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials`);
  }

  saveWorkHistory(item: WorkHistory): Observable<any> {
    return item.id
      ? this.http.put(`${this.baseUrl}/work-history`, item)
      : this.http.post(`${this.baseUrl}/work-history`, item);
  }

  deleteWorkHistory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/work-history`, { body: { id } });
  }

  saveEducation(item: Education): Observable<any> {
    return item.id
      ? this.http.put(`${this.baseUrl}/education`, item)
      : this.http.post(`${this.baseUrl}/education`, item);
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/education`, { body: { id } });
  }

  saveSkill(item: Skill): Observable<any> {
    return item.id
      ? this.http.put(`${this.baseUrl}/skills`, item)
      : this.http.post(`${this.baseUrl}/skills`, item);
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/skills`, { body: { id } });
  }

  saveTestimonial(item: Testimonial): Observable<any> {
    return item.id
      ? this.http.put(`${this.baseUrl}/testimonials`, item)
      : this.http.post(`${this.baseUrl}/testimonials`, item);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/testimonials`, { body: { id } });
  }

  uploadFile(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>('https://api.varanjith.com/upload.php', formData);
  }

  downloadCv(): Observable<Blob> {
    return this.http.get('https://api.varanjith.com/uploads/cv.pdf', { responseType: 'blob' });
  }
}

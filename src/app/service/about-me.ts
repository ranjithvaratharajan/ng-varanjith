import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface AboutMeDescription {
  id?: number;
  content: string; // JSON string for multiple paragraphs
}

export interface Service {
  id?: number;
  icon: string;
  title: string;
  description: string;
}

export interface WorkProcess {
  id?: number;
  icon: string;
  title: string;
}

export interface Client {
  id?: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutMeService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.varanjith.com/about-me';

  // Description
  getDescription(): Observable<AboutMeDescription> {
    return this.http.get<AboutMeDescription>(`${this.baseUrl}/description`);
  }

  saveDescription(description: AboutMeDescription): Observable<any> {
    return description.id
      ? this.http.put(`${this.baseUrl}/description`, description)
      : this.http.post(`${this.baseUrl}/description`, description);
  }

  deleteDescription(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/description`, { body: { id } });
  }

  // Services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services`);
  }

  saveService(service: Service): Observable<any> {
    return service.id
      ? this.http.put(`${this.baseUrl}/services`, service)
      : this.http.post(`${this.baseUrl}/services`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/services`, { body: { id } });
  }

  // Work Process
  getWorkProcess(): Observable<WorkProcess[]> {
    return this.http.get<WorkProcess[]>(`${this.baseUrl}/work-process`);
  }

  saveWorkProcess(process: WorkProcess): Observable<any> {
    return process.id
      ? this.http.put(`${this.baseUrl}/work-process`, process)
      : this.http.post(`${this.baseUrl}/work-process`, process);
  }

  deleteWorkProcess(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/work-process`, { body: { id } });
  }

  // Clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients`);
  }

  saveClient(client: Client): Observable<any> {
    return client.id
      ? this.http.put(`${this.baseUrl}/clients`, client)
      : this.http.post(`${this.baseUrl}/clients`, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clients`, { body: { id } });
  }

  // File Upload
  uploadFile(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>('https://api.varanjith.com/upload.php', formData);
  }
}

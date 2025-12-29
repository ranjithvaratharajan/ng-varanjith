import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

interface LoginResponse {
  token?: string;
  message?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://api.varanjith.com';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('jwt_token'));
  // private token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    // Hash password client-side using SHA-256
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login`,
        { username, password: hashedPassword },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response) => {
          if (response?.token) {
            localStorage.setItem('jwt_token', response.token);
            this.tokenSubject.next(response.token);
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.error?.error || 'Login failed'));
        })
      );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.tokenSubject.next(null);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}

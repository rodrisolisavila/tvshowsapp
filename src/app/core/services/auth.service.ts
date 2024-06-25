import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<boolean> {
    const url = `${API_URL}/auth/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(url, body, { headers }).pipe(
      map(response => {
        if (response) {
          return true;
        }
        return false;
      }),
      catchError(this.handleError<boolean>('register', false))
    );
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${API_URL}/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(url, body, { headers }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
          return true;
        }
        return false;
      }),
      catchError(this.handleError<boolean>('login', false))
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

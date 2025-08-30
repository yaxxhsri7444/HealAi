import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/api/chat'; // apna backend URL

  constructor(private http: HttpClient) {}

  // Authorization header generate karne ke liye ek method
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // token ko localStorage se nikal rahe
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  
  sendMessage(message: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/send`,
      { message },
      { headers: this.getAuthHeaders() }
    );
  }

  getChats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      headers: this.getAuthHeaders(),
    });
  }

  getMoodSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mood-stats`);
  }
}


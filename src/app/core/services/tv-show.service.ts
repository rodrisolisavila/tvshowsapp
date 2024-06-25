import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShow } from '../models/tv-show.model';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) {}

  getTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${API_URL}/tvshows`);
  }

  getTvShow(id: number): Observable<TvShow> {
    return this.http.get<TvShow>(`${API_URL}/tvshows/${id}`);
  }

  createTvShow(tvShow: TvShow): Observable<TvShow> {
    return this.http.post<TvShow>(`${API_URL}/tvshows`, tvShow, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  updateTvShow(tvShow: TvShow): Observable<TvShow> {
    return this.http.put<TvShow>(`${API_URL}/tvshows/${tvShow.id}`, tvShow, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  deleteTvShow(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/tvshows/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
}

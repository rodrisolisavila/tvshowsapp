import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TvShow } from '../../../core/models/tv-show.model';
import { TvShowService } from '../../../core/services/tv-show.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.scss']
})
export class TvShowListComponent implements OnInit {
  tvShows: TvShow[] = [];

  constructor(private tvShowService: TvShowService, private router: Router) {}

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows(): void {
    this.tvShowService.getTvShows().subscribe(
      shows => {
        this.tvShows = shows;
      },
      error => {
        console.error('Error loading TV shows:', error);
      }
    );
  }

  editShow(id: number): void {
    this.router.navigate(['/tv-show-edit', id]);
  }

  deleteShow(id: number): void {
    if (confirm('Are you sure you want to delete this TV show?')) {
      this.tvShowService.deleteTvShow(id).subscribe(
        () => {
          this.loadTvShows(); // Recarga la lista después de eliminar
        },
        error => {
          console.error('Error deleting TV show:', error);
        }
      );
    }
  }
}

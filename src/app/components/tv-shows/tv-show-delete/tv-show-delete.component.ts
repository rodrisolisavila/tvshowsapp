import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShow } from '../../../core/models/tv-show.model';
import { TvShowService } from '../../../core/services/tv-show.service';

@Component({
  selector: 'app-tv-show-delete',
  templateUrl: './tv-show-delete.component.html',
  styleUrls: ['./tv-show-delete.component.scss']
})
export class TvShowDeleteComponent implements OnInit {

  tvShow: TvShow | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvShowService: TvShowService
  ) { }

  ngOnInit(): void {
    const tvShowId = +this.route.snapshot.params['id'];
    if (tvShowId) {
      this.tvShowService.getTvShow(tvShowId)
        .subscribe(
          tvShow => {
            this.tvShow = tvShow;
          },
          error => {
            console.error('Error fetching TV show:', error);
            this.errorMessage = 'Error fetching TV show';
          }
        );
    }
  }

  deleteTvShow(): void {
    if (this.tvShow) {
      this.tvShowService.deleteTvShow(this.tvShow.id)
        .subscribe(
          _ => {
            this.router.navigate(['/tv-show-list']);
          },
          error => {
            console.error('Error deleting TV show:', error);
            this.errorMessage = 'Error deleting TV show';
          }
        );
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/tv-show-list']);
  }

}

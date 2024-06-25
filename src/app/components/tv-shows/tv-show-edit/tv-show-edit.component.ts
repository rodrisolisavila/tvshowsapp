import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShow } from '../../../core/models/tv-show.model';
import { TvShowService } from '../../../core/services/tv-show.service';

@Component({
  selector: 'app-tv-show-edit',
  templateUrl: './tv-show-edit.component.html',
  styleUrls: ['./tv-show-edit.component.scss']
})
export class TvShowEditComponent implements OnInit {

  tvShow: TvShow = { id: 0, name: '', favorite: false }; // Inicializa con valores predeterminados
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

  updateTvShow(): void {
    this.tvShowService.updateTvShow(this.tvShow)
      .subscribe(
        _ => {
          this.router.navigate(['/tv-show-list']);
        },
        error => {
          console.error('Error updating TV show:', error);
          this.errorMessage = 'Error updating TV show';
        }
      );
  }

}

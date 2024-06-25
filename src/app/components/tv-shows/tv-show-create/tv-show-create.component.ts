import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TvShowService } from '../../../core/services/tv-show.service';
import { TvShow } from '../../../core/models/tv-show.model';

@Component({
  selector: 'app-tv-show-create',
  templateUrl: './tv-show-create.component.html',
  styleUrls: ['./tv-show-create.component.scss']
})
export class TvShowCreateComponent {
  tvShow: TvShow = {
    id: -1,
    name: '',
    favorite: false
  };
  errorMessage: string = '';

  constructor(private tvShowService: TvShowService, private router: Router) { }

  createTvShow(): void {
    this.tvShowService.createTvShow(this.tvShow)
      .subscribe(
        _ => {  // Usando _ para indicar que no necesitas usar el valor devuelto
          this.router.navigate(['/tv-show-list']);
        },
        error => {
          console.error('Error creating TV show:', error);
          this.errorMessage = 'Error creating TV show';
        }
      );
  }
}

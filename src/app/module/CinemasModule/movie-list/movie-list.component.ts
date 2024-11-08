import { Component } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { MovieApiService } from '../data-access/movie-api.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MovieCardComponent } from "../../../shared/iu/movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieApiService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/movie', id]);
  }

}
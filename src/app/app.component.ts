import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Francisco';
  message = `Welcome ${this.title}!`;

  private movieTitle:string = "";

  public movies:Array<any> = [
    { title: 'Caperucita'},
    { title: 'Avengers'},
    { title: 'Superman'}
  ];

  addMovie() {
    console.log('Agregar pelicula', this.movieTitle);
    if(!this.movieTitle) return;
    this.movies.push({
      title: this.movieTitle
    });
    this.movieTitle = '';
  }

  submitWithEnter(e:any) {
    console.log('Voy a agregar la pelicula', e);
    if(e.key === 'Enter') {
      this.addMovie();
    }

  }
}



export class Movie{
constructor(data){
  this.title = data.title
  this.posterImg = data.postImg || 'https://image.tmdb.org/t/p/w500' + data.poster_path
  this.description = data.overview
  this.rating = data.score || data.vote_average * 10
  this.id = data.id
  this.backdrop = data.backdrop || 'https://image.tmdb.org/t/p/w500' + data.backdrop_path
}
}
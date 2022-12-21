

export class Movie{
constructor(data){
  this.title = data.title
  this.posterImg = data.postImg || 'https://image.tmdb.org/t/p/w500' + data.poster_path
  this.description = data.overview
  this.rating = data.popularity
  this.id = data.id
}
}
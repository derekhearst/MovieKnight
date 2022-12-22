

export class Movie{
constructor(data){
  this.title = data.title
  this.posterImg = data.postImg || 'https://image.tmdb.org/t/p/w500' + data.poster_path || 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdmllJTIwcGxhY2Vob2xkZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  this.description = data.overview
  this.rating = data.score || data.vote_average * 10
  this.id = data.id
  this.backdrop = data.backdrop || 'https://image.tmdb.org/t/p/w500' + data.backdrop_path
  // this.genre_ids = data.genre_ids
}
}
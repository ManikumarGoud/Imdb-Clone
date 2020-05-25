import Proxy from './Proxy'

export default class MoviesProxy extends Proxy {
  constructor(parameters) {
    super('https://api.themoviedb.org/3', parameters);
  }

  getTrending(payload) {
    return this.submit('get', `/trending/${payload.mediaType}/${payload.timeWindow}`);
  }

  getMovies(type) {
    return this.submit('get', `/movie/${type}`);
  }

  getMovie(id) {
    return this.submit('get', `/movie/${id}`);
  }

  getCredits(id) {
    return this.submit('get', `/movie/${id}/credits`);
  }

  getSimilar(id) {
    return this.submit('get', `/movie/${id}/similar`);
  }
  searchMovie() {
    return this.submit('get', `/search/movie`);
  }

  getPhotos(id) {
    return this.submit('get', `/movie/${id}/images`);
  }
}


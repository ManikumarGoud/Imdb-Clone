import Proxy from './Proxy'

export default class PersonProxy extends Proxy {
  constructor(parameters) {
    super('https://api.themoviedb.org/3', parameters);
  }

  getCast(id) {
    return this.submit('get', `/person/${id}`);
  }

  getMovieCredits(id) {
    return this.submit('get', `/person/${id}/movie_credits`);
  }
}


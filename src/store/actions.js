import { MoviesProxy } from '../proxies'
import * as actions from './action-types';

export default {
  getTrending: (payload) => {
    return dispatch => new Promise((resolve, reject) => {
      new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c' }).getTrending(payload).then(response => {
        dispatch({ type: actions.GET_TRENDINGS, payload: response });
        resolve();
      }).catch(err => {
        reject();
      }); 
    })
  },

  getMovies: (payload) => {
    return dispatch => new Promise((resolve, reject) => {
      new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c', page: payload.page }).getMovies(payload.endpoint).then(response => {
        dispatch({ type: payload.type, payload: response });
        resolve(response)
      }).catch(err => {
        reject();
      })
    })
  },
  getMovie: (payload) => {
    return dispatch => new Promise((resolve, reject) => {
      new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c' }).getMovie(payload).then(response => {
        dispatch({ type: actions.GET_MOVIE, payload: response });
        resolve(response);
      }).catch(err => {
        reject();
      })
    })
  },

  getCredits: (payload) => {
    return dispatch => new Promise((resolve, reject) => {
      new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c' }).getCredits(payload).then(response => {
        dispatch({ type: actions.GET_MOVIE_ACTORS, payload: response });
        resolve(response);
      }).catch(err => {
        reject(err);
      })
    })
  },

  searchMovie: (payload) => {
    return dispatch => new Promise((resolve, reject) => {
      new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c', query: payload }).searchMovie().then(response => {
        dispatch({ type: actions.SEARCH_MOVIE, payload: response })
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  }
};

import state from './state';
import * as actions from './action-types';

const initialState = state;

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_TRENDINGS:
      return {
        ...state,
        trendingMovies: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    case actions.GET_NOWPLAYING:
      return {
        ...state,
        nowPlaying: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    case actions.GET_TOPRATED:
      return {
        ...state,
        topRated: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    case actions.GET_POPULAR: 
      return {
        ...state,
        popular: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    case actions.GET_UPCOMING:
      return {
        ...state,
        upcoming: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    case actions.SEARCH_MOVIE:
      return {
        ...state,
        searchResults: {
          results: action.payload.results,
          pagination: {
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            total_results: action.payload.total_results
          }
        }
      }
    default:
      return state;

  }
};
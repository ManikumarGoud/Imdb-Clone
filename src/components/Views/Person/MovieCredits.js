import React, { Component } from 'react';
import { PersonProxy } from '../../../proxies'
import { Link } from 'react-router-dom';
import MovieItem from '../../UIComponents/MovieItem';

class MovieCredits extends Component {
  state = {
    movies: {
      cast: [],
      crew: [],
      id: ''
    }
  }

  componentDidMount() {
    new PersonProxy({ api_key: '413c8042ab31652325d5a5a50a75fd47' }).getMovieCredits(this.props.match.params.id).then(response => {
      this.setState({
        movies: response
      })
    })
  }
  fetchMovie = () => {
    new PersonProxy({ api_key: '413c8042ab31652325d5a5a50a75fd47' }).getMovieCredits(this.props.match.params.id).then(response => {
      this.setState({
        movies: response
      })
    })
  }
  render() {
    let { movies } = this.state;

    return (
      <div className="person-movies-container">
        <div className="list-container pl-30 pr-30">
        { movies.cast.length > 0 && movies.cast.map((item, key) => (
            <Link key={key} to={`/movie/${item.id}/movies`} onClick={this.fetchMovie}>
              <MovieItem 
                title={item.title}
                rating={item.vote_average}
                image={item.poster_path}
              />
            </Link>
        ))}
      </div>
      </div>
    );
  };
};

export default MovieCredits;

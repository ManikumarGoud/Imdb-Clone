import React, {Component} from 'react';
import { Carousel, Button } from 'antd'
import ItemScroller from '../UIComponents/ItemScroller'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/action-types'
import actions from '../../store/actions'
import { IMAGE_ADDRESS } from '../../helpers/constants'

class MainPage extends Component {


  componentDidMount() {
    this.props.dispatch(actions.getMovies({endpoint: 'top_rated', type: actionTypes.GET_TOPRATED}))
    this.props.dispatch(actions.getTrending({mediaType: 'all', timeWindow: 'week'}))
    this.props.dispatch(actions.getMovies({endpoint: 'now_playing', type: actionTypes.GET_NOWPLAYING}))
    this.props.dispatch(actions.getMovies({endpoint: 'upcoming', type: actionTypes.GET_UPCOMING}))
    this.props.dispatch(actions.getMovies({endpoint: 'popular', type: actionTypes.GET_POPULAR})).then(response => console.log("Popular movies", response));
  }
  render() {
    return (<div className="mainpage-container">
      <Carousel autoplay="autoplay">
        {
          this.props.popular.results.map((movie, key) => (key <= 2 && <div className="carousel-item" key={key}>
            <img src={`${IMAGE_ADDRESS}/${movie.backdrop_path}`} className="carousel-image" alt="movie"/>
            <div className="carousel-caption">
              <h1 className="carousel-movie-header">{movie.title}</h1>
              <h2>Drama - {movie.vote_average}</h2>
              <p>{movie.description}</p>
              <Link to={`/movie/${movie.id}`}>
                <Button className="btn-red mt-20">Details</Button>
              </Link>
            </div>
          </div>))
        }
      </Carousel>
      <div className="container mt-30">
        <Link to="/movies/trending">
          <h1>Trending</h1>
        </Link>
        <ItemScroller data={this.props.trendingMovies && this.props.trendingMovies}/>
      </div>
      <div className="container mt-30">
        <Link to="/movies/nowplaying">
          <h1>Now Playing</h1>
        </Link>
        <ItemScroller data={this.props.nowPlaying && this.props.nowPlaying} />
      </div>
      <div className="container mt-30">
        <Link to="/movies/toprated">
          <h1>Top Rated</h1>
        </Link>
        <ItemScroller data={this.props.topRated && this.props.topRated}/>
      </div>
      <div className="container mt-30">
        <Link to="/movies/upcoming">
          <h1>Upcoming</h1>
        </Link>
        <ItemScroller data={this.props.upcoming && this.props.upcoming}/>
      </div>
    </div>);
  };
};

const mapStateToProps = ({ trendingMovies, topRated, nowPlaying, upcoming, popular }) => ({ trendingMovies, topRated, nowPlaying, upcoming, popular });
export default connect(mapStateToProps)(MainPage);

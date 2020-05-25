import React, { Component } from 'react'
import actions from '../../../store/actions'
import { connect } from 'react-redux'
import { Col, Row, Rate, Button, Modal } from 'antd'
import PersonItem from '../../UIComponents/PersonItem'
import { MoviesProxy } from '../../../proxies';
import { withRouter, Link } from 'react-router-dom'
import { generateUserImageSource } from '../../../helpers/methods'


//TODO: Film image' larını basarak büyük bir modal' da görebilme
class MovieDetail extends Component {
  state = {
    movie: null,
    photos: null,
    imageModalVisible: false,
  }
  
  goCast = () => {
    this.props.history.push(`${this.props.match.params.id}/cast`)
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchImage();
    }
  }
  componentDidMount() {
    this.fetchMovieDetails();
    this.fetchImages();
  }
  fetchImages = () => {
    new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c' }).getPhotos(this.props.match.params.id).then(data => {
      this.setState({
        photos: data
      })
    })
  }
  showImage = () => {
    this.setState({
      imageModalVisible: true
    })
  }
  closeModal = () => {
    this.setState({
      imageModalVisible: false
    });
  }

  fetchMovieDetails = () => {
    let id = this.props.match.params.id;

    this.props.dispatch(actions.getMovie(id)).then(movie => {
      this.setState({
        movie
      }, () => {
        this.props.dispatch(actions.getCredits(id)).then(response => {
          let { movie } = this.state;
          movie.credits = response;
          this.setState({
            movie
          }, () => {
            new MoviesProxy({ api_key: '3aa42666769d5d67b81910715e8f560c' }).getSimilar(id).then(similars => {
              let { movie } = this.state;
              movie.similars = similars;
              this.setState({
                movie
              })
            });
          })
        })
      })
    })
    window.scrollTo(0,0);
  }
  render () {
    let { movie } = this.state

    return (
      <div className='movie-details-container'>
        {movie && (
          <React.Fragment>
            <Row className='movie-header'>
              <Col>
                <img
                  src={generateUserImageSource(movie.backdrop_path)}
                  className='movie-backdrop'
                  alt="movie"
                />
              </Col>
            </Row>
            <Row type='flex' justify='center'>
              <Col span={19}>
                <div className='movie-card'>
                  <Row>
                    <Col span={6}>
                      <img
                        src={generateUserImageSource(movie.poster_path)}
                        className='movie-poster'
                        alt="movie"
                      />
                    </Col>
                    <Col span={16} offset={1}>
                      <p className='movie-title mb-10'>{movie.title}</p>
                      <div className='movie-info'>
                        <span className='movie-info-item'>
                          {movie.release_date}
                        </span>
                        <span className='movie-info-item'>
                          {movie.genres.map((item, i) => (
                            <span className='movie-genre' key={`ebeninamcigi${i}`}>{item.name}</span>
                          ))}
                        </span>
                        <span className='movie-info-item'>
                          {movie.runtime} min
                        </span>
                      </div>
                      <div className='movie-rating mt-20'>
                        <Rate
                          disabled
                          allowHalf
                          allowClear
                          defaultValue={movie.vote_average / 2}
                        />
                        <span className='movie-average'>
                          {movie.vote_average} / 10
                        </span>
                      </div>
                      <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                        <img src="/imdb.svg" style={{ width: '30px' }} className="mt-20" alt="movie" />
                      </a>
                    </Col>
                  </Row>
                  <Row className='mt-30'>
                    <Col span={12} className='pt-30'>
                      <h1>Storyline</h1>
                      <p className='movie-overview'>{movie.overview}</p>
                    </Col>
                    <Col span={7} offset={4} className='movie-details pt-30'>
                      <h1>Details</h1>
                      <p>Release Date : {movie.release_date}</p>
                      <p>
                        Country :{' '}
                        {movie.production_countries.map((item, index) => (
                          <span key={index}>{item.name}</span>
                        ))}
                      </p>
                      <p>
                        Homepage:{' '}{<a href={movie.homepage}>{movie.homepage}</a>}
                      </p>
                      <p>Revenue : {`$ ${movie.revenue}`}</p>
                      <p>Status : {movie.status}</p>
                      <p>Vote Average : {movie.vote_average} / 10 </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row type='flex' justify='center' className='mt-30'>
              <Col span={19}>
                <Col span={14}>
                  <h1>Photos</h1>
                  { this.state.photos && this.state.photos.backdrops.length > 0 && this.state.photos.backdrops.map((item, key) => {
                    return (
                      key < 6 && 
                        <Modal
                          title="Basic Modal"
                          visible={this.state.visible}
                          onCancel={this.handleCancel}
                        >
                          <img key={key} src={generateUserImageSource(item.file_path)} className="movie-photo" alt="movie" />
                        </Modal>
                    )
                  })}
                </Col>
                <Col span={7} offset={2}>
                  <div className='movie-details'>
                    <h1>Cast</h1>
                    {movie &&
                      movie.credits &&
                      movie.credits.cast.map(
                        (cast, index) =>
                          index < 4 && (
                            <PersonItem
                              key={index}
                              person={cast}
                            />
                          )
                      )}
                    <Link to={`/movie/${movie.id}/cast`}>
                      <Button className="btn-link">See All</Button>
                    </Link>
                  </div>
                </Col>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ movie }) => ({ ...movie })
export default withRouter(connect(mapStateToProps)(MovieDetail));

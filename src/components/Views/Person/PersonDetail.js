import React, { Component } from 'react';
import { PersonProxy } from '../../../proxies'
import { Row, Col } from 'antd'
import MovieItem from '../../UIComponents/MovieItem';
import { Link } from 'react-router-dom'
import { IMAGE_ADDRESS } from '../../../helpers/constants'

class PersonDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: { },
      movieCredits: {
        cast: []
      },
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let proxy = new PersonProxy({ api_key: `413c8042ab31652325d5a5a50a75fd47` })
    proxy.getCast(id).then(response => {
      this.setState({
        person: response
      })
    }).then(() => {

      proxy.getMovieCredits(id).then(response => {
        this.setState({
          movieCredits: response
        })
      })
    })
  }

  render() {
    let { person, movieCredits } = this.state;
    let personId = this.props.match.params.id;
    return (
      <div className="person-detail-container">
        <div className="person-thumbnail">
          {/* <img src="" alt="movie"/> */}
        </div>
        { person &&
          <div className="person-detail">
            <Row className="person-card">
            <Col span={6}>
            {person && person.profile_path && 
              <img src={`${IMAGE_ADDRESS}/${person.profile_path}`} alt={person.name} style={{ width: '100%' }} />
            }
            </Col>
            <Col span={10} offset={1}>
              <h1>{person.name} {person.deathday ? ' - ' + person.deathday : ''}</h1>
              <p className="person-description"><span>Birthday : </span>{ person.birthday }</p>
              <p className="person-description"><span>Place of birth : </span>{ person.place_of_birth }</p>
              <p className="person-description"><span>Gender : </span>{ person.gender === 0 ? 'Female' : 'Male'  }</p>
              <p className="person-description"><span>Department : </span>{ person.known_for_department }</p>
              <p className="person-description"><span>Popularity : </span>{ person.popularity }</p>
            </Col>
            </Row>
            <Row className="overview">
              <Col span={24}>
                <h1 className="bottom-bordered">Overview</h1>
                <p>{ person.biography }</p>
              </Col>
            </Row>
            <div className="person-credits">
              <Link to={`/person/${personId}/movies`}>
                <h1 className="bottom-bordered">Movies</h1>
              </Link>
              { movieCredits.cast.map((item, index) => (
                index < 4 &&
                <Link to={`/movie/${item.id}/details`}>
                  <MovieItem
                    key={index}
                    title={item.title}
                    rating={item.vote_average}
                    image={item.poster_path}
                  />
                </Link>
              ))}
            </div>
          </div>
        }
      </div>
    );
  };
};

export default PersonDetail;

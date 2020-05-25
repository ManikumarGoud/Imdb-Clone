import React, { Component } from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MovieItem from '../../UIComponents/MovieItem'
import actions from '../../../store/actions';
import * as actionTypes from '../../../store/action-types'

// TODO: Her resultpage için pagination da içeren ortak bir component geliştir.
class TopRated extends Component {
  state = {
    current_page: 1
  }

  componentDidMount() {
    this.props.dispatch(actions.getMovies({ endpoint: 'top_rated', type: actionTypes.GET_TOPRATED, page: this.state.current_page }));
  }
  changePage = (current_page) => {
    this.setState({
      current_page
    }, () => {
      this.props.dispatch(actions.getMovies({ endpoint: 'top_rated', type: actionTypes.GET_TOPRATED, page: this.state.current_page }));
    })
  }
  render () {
    let { topRated } = this.props

    return (
      <div className='results-container'>
        <div className='results'>
          {topRated.results.length > 0 &&
            topRated.results.map((item, key) => (
              <Link key={key} to={`/movie/${item.id}/details`}>
                <MovieItem
                  title={item.title}
                  rating={item.vote_average}
                  image={item.poster_path}
                />
              </Link>
            ))}
        </div>
        <div className='pagination mr-30'>
          {this.props.topRated.pagination.total_pages >= 1 && (
            <Pagination
              onChange={this.changePage}
              total={this.props.topRated.pagination.total_results}
              pageSize={this.props.topRated.pagination.total_pages}
              current={this.state.current_page}
            />
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ topRated }) => ({ topRated })
export default connect(mapStateToProps)(TopRated);

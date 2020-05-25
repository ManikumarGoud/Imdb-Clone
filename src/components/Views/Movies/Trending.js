import React, { Component } from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MovieItem from '../../UIComponents/MovieItem'
import actions from '../../../store/actions';

// TODO: Her resultpage için pagination da içeren ortak bir component geliştir.
class Trending extends Component {
  state = {
    current_page: 1
  }
  changePage = (current_page) => {
    this.setState({
      current_page
    }, () => {
      this.props.dispatch(actions.getTrending({ mediaType: 'all', timeWindow: 'week' }))
    })
  }
  render () {
    let { trendingMovies } = this.props

    return (
      <div className='results-container'>
        <div className='results'>
          {trendingMovies.results.length > 0 &&
            trendingMovies.results.map((item, key) => (
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
          {this.props.trendingMovies.pagination.total_pages >= 1 && (
            <Pagination
              onChange={this.changePage}
              total={this.props.trendingMovies.pagination.total_results}
              pageSize={this.props.trendingMovies.pagination.total_pages}
              current={this.state.current_page}
            />
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ trendingMovies }) => ({ trendingMovies })
export default connect(mapStateToProps)(Trending)

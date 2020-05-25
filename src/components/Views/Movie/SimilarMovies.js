import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Pagination } from 'antd';

import { MoviesProxy } from '../../../proxies';
import MovieItem from '../../UIComponents/MovieItem';

class SimilarMovies extends Component {

  state = {
    similars: [],
    page: 1,
    total_pages: 0,
    total_results: 0
  };

  componentDidMount() {
    new MoviesProxy({ api_key: '413c8042ab31652325d5a5a50a75fd47', page: this.state.page }).getSimilar(this.props.match.params.id).then(response => {
      this.setState({
        similars: response.results,
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      })
    });
  }
  onPageChange = (page) => {
      console.log("Page changed", page);
      new MoviesProxy({ api_key: '413c8042ab31652325d5a5a50a75fd47', page }).getSimilar(this.props.match.params.id).then(response => {
        this.setState({
          similars: response.results,
          page: response.page,
          total_pages: response.total_pages,
          total_results: response.total_results
        })
      });
  }
  render() {
    let { similars, page, total_pages } = this.state;
    console.log("Similar movies", similars);
    return (
      <div className="similar-movies-container">
        <div className="list-container pl-30 pr-30">
          { similars.length > 0 && similars.map((item, key) => (
            <Link key={key} to={`/movie/${item.id}/details`}>
              <MovieItem 
                title={item.title}
                rating={item.vote_average}
                image={item.poster_path}
              />
            </Link>
          ))}   
        </div>
        <Pagination 
            size="small" 
            total={total_pages} 
            showSizeChanger 
            showQuickJumper
            onChange={(page) => this.onPageChange(page)}
            current={page} 
          />
      </div>
    )
  }
}

export default SimilarMovies;
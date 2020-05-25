import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { IMAGE_ADDRESS } from '../../helpers/constants'

class ItemScroller extends Component {
  
  render () {
    let { data } = this.props;

    return (
      <div className="slider">
          {data.results.length > 0 && data.results.map((item, index) => (
            <Link to={`/movie/${item.id}`} key={index}>
                <Card
                  className="movie-cover"
                  key={index}
                  cover={<img src={`${IMAGE_ADDRESS}/${item.poster_path}`}
                  alt={item.title}/>}>
                <Card.Meta title={item.title} />
              </Card>
            </Link>
          ))}
      </div>
    )
  }
}

export default ItemScroller;

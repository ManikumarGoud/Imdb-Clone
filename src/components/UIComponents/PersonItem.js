import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_ADDRESS } from '../../helpers/constants'

class PersonItem extends Component {

  render() {
    let { person } = this.props;

    return (
      <Link to={`/person/${person.id}`}>
        <div className="person-item-container pb-20">
          <img src={`${IMAGE_ADDRESS}/${person.profile_path}`} className="profile-img mr-20" alt="movie" />
          <span className="person-name">{person.name}</span>
        </div>
      </Link>
    );
  };
};

export default PersonItem;

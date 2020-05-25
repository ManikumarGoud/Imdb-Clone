import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../routes/routes';

class Movie extends Component {
  render() {
    const movieRoutes = routes.find(x => x.name === 'movie');
    return (
        <Switch>
          { movieRoutes.routes.map(x => (
              <Route key={x.path} path={`${movieRoutes.path}${x.path}`} component={x.component} />
          ))}
          <Redirect to={`/movie/${this.props.match.params.id}/details`} />
        </Switch>
    );
  };
};

export default Movie;

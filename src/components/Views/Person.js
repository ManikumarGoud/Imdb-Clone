import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import routes from '../../routes';

class Person extends Component {
  render() {
    const personRoutes = routes.find(route => route.name === 'person');
    return (
        <Switch>
          { personRoutes.routes.map(x => (
            <Route key={x.path} path={`${personRoutes.path}${x.path}`} component={x.component} />
          ))}
          <Redirect to={`/person/${this.props.match.params.id}/details`} />
        </Switch>
    )
  };
};

export default Person;

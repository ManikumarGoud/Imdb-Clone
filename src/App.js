import React, { Component } from 'react';
import { Layout, Select } from 'antd';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from './store/actions'
import routes from './routes'

import "antd/dist/antd.css";
import './assets/main.scss'

class App extends Component {

  state = {
    loading: false,
    displayedResults: [],
    value: undefined
  }

  handleChange = (value) => {
    this.props.history.push(`/movie/${value}`)
    
    window.location.reload()
  }
  handleSearch = (value) => {
    this.setState({ loading: true })
    this.props.dispatch(actions.searchMovie(value)).finally(() => {
      this.setState({ loading: false })
    })
  }

  seeAll = () => {
    console.log("See all resulttsss");
    this.props.history.push('/search')
  }

  render() {
    const { Header, Content, Footer } = Layout;
    return (
      <div className="App">
        <Header>
        <Link to="/">
          <img className="logo" src="/imdb.png" alt="filmable" />
         </Link>
          <Select
            className="search-box"
            placeholder={"Search Movies"}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            onSelect={this.handleChange}
            showSearch
            showArrow={false}
            defaultActiveFirstOption={false}
            filterOption={false}
            style={{ width: '200px' }}
            >
              { this.props.searchResults.results.map(item => <Select.Option key={item.id}>{item.title}</Select.Option>)}
          </Select>
        </Header>
        <Content>
          <Switch>
            {routes.map((route, index) => (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={index}
              />
            ))}
          </Switch>
        </Content>
        <Footer>
          Created by React ®. All rights reserved.
        </Footer>
      </div>
    );
  }
}

const mapStateToProps = ({ searchResults }) => ({ searchResults });
export default withRouter(connect(mapStateToProps)(App));

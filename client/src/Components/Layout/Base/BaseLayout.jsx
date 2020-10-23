import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Home from '../Home';
import Header from '../../Common/Header/Header';
import Profile from '../Profile';

import Login from '../Login/Login';
import Logout from '../Logout';

import AuthRouter from './AuthRouter';
import isAuth from '../../../helpers/isAuth';

export default class UserLayout extends Component {
  state = {
    showlogo: true,
    showMeun: true,
    showAvatar: false,
    isAvatarImage: false,
    srcImage: null,
    isLogin: false,
    isAdmin: false,
    Name: 'User',
  };

  componentDidMount() {
    isAuth()
      .then((result) => {
        const user = result.data.user;
        this.setState({
          showlogo: true,
          showMeun: true,
          showAvatar: false,
          isAvatarImage: false,
          srcImage: null,
          isLogin: true,
          isAdmin: user.role,
          Name: user.name,
        });
      })
      .catch((err) => {
        this.setState({
          showlogo: true,
          showMeun: true,
          showAvatar: false,
          isAvatarImage: false,
          srcImage: null,
          isLogin: false,
          isAdmin: false,
          Name: '',
        });
      });
  }

  render() {
    const {
      showlogo,
      showMeun,
      showAvatar,
      isAvatarImage,
      srcImage,
      isLogin,
      isAdmin,
      Name,
    } = this.state;
    return (
      <Router onChange={this.onRouteChanged}>
        <Grid direction="column" container>
          <Grid item xs={12}>
            <Header
              showlogo={showlogo}
              showMeun={showMeun}
              showAvatar={showAvatar}
              isAvatarImage={isAvatarImage}
              srcImage={srcImage}
              isLogin={isLogin}
              isAdmin={isAdmin}
              Name={Name}
            />
          </Grid>
          <Grid item container>
            <Grid item xs={false} md={3} />
            <Grid item container xs={12} md={6}>
              <Switch>
                <Route exact path="/user/login" component={Login} />
                <Route exact path="/user/Logout" component={Logout} />

                <Route exact path="/" component={AuthRouter(Home)} />
                <Route
                  exact
                  path="/user/profile"
                  component={AuthRouter(Profile, '')}
                />
              </Switch>
            </Grid>
            <Grid item xs={false} md={3} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}

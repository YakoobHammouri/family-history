import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuth from '../../../helpers/isAuth';
import swal from 'sweetalert';

export default (AuthComponent, role) => {
  return class AuthRouter extends Component {
    state = {
      isAuthenticated: false,
      isLoading: true,
    };
    componentDidMount() {
      isAuth(role)
        .then((result) => {
          this.setState({ isLoading: false, isAuthenticated: true });
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            // swal('Error', err.response.data.messag, 'error');
          }

          this.setState({ isLoading: false, isAuthenticated: false });
        });
    }

    render() {
      const { isAuthenticated, isLoading } = this.state;
      if (isLoading) {
        return null;
      }
      if (!isAuthenticated) {
        return <Redirect to={`/user/login`} />;
      }
      return <AuthComponent {...this.props} />;
    }
  };
};

import React, { Component } from 'react';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormHelperText,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import Cookies from 'js-cookie';
import { withStyles } from '@material-ui/core/styles';
import { validateEmail } from '../../../helpers/Validation';
import LoaderProgress from '../../Common/LoaderProgress';

import axios from 'axios';
import LoginStyles from './LoginStyle';

class Login extends Component {
  state = {
    logindata: { email: null, password: null },
    isLoading: false,
    displayBlock: true,
    showPassword: false,
    email: {
      message: '',
      isValid: true,
    },
    password: {
      message: '',
      isValid: true,
      minLength: 3,
    },
    redirect: false,
    ReturnUrlText: '/',
    SignupLink: '/user/Signup/',
    ReturnUrl: false,
  };

  componentDidMount() {
    const AuthToken = Cookies.get('AuthToken');
    console.log('AuthToken : ', AuthToken);
    this.setState({
      // if the user log in we will redirect to Home
      redirect: !AuthToken ? false : true,
    });
  }

  renderAction = () => {
    if (this.state.redirect) {
      return window.location.replace(`${this.state.ReturnUrlText}`);
      //return <Redirect to={this.state.ReturnUrlText} />;
    }
  };

  handleTextInput = (e) => {
    const form = this.state.logindata;
    form[e.target.name] = e.target.value;
    this.setState({ logindata: form });
  };

  handleClickShowPassword = () => {
    const showPassword = this.state.showPassword;

    this.setState({
      showPassword: !showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, logindata } = this.state;

    if (!logindata.email) {
      email.message = 'رجاء ادخال اسم المستخدم';
      email.isValid = false;
    } else if (!validateEmail(logindata.email)) {
      // the Email is not Valid
      email.message = 'الرجاء تاكد من اسم المستخدم';
      email.isValid = false;
    } else {
      email.message = '';
      email.isValid = true;
    }

    if (!logindata.password) {
      password.message = 'رجاء ادخال كلمة المرور';
      password.isValid = false;
    } else if (logindata.password.length < password.minLength) {
      password.message = `يجب أن تحتوي كلمة المرور على الأقل
      ${password.minLength} حرف `;
      password.isValid = false;
    } else {
      password.message = '';
      password.isValid = true;
    }

    if (!email.isValid || !password.isValid) {
      this.setState({ email: email, password: password });
      return;
    }

    this.setState({ email: email, password: password, isLoading: true });

    axios
      .post(`/user/login/`, logindata)
      .then((result) => {
        const data = result.data;

        //ReturnUrlText;
        const url = '/';

        this.setState({ redirect: true, ReturnUrlText: url });
        //swal(data.messag);
      })
      .catch((err) => {
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      displayBlock,
      logindata,
      email,
      password,
      showPassword,
      SignupLink,
    } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';
    return (
      <Box component="div" m={6} p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Paper elevation={3} className={classes.content}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  تسجيل دخول
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box mb={3}>
                  <Typography variant="subtitle2" color="textSecondary">
                    الرجاء تسجيل الدخول للمتابعة
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={this.handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Grid
                    container
                    justify="flex-start"
                    className={classes.gutterBottom}
                  >
                    <Grid item>
                      <PersonIcon
                        color="disabled"
                        className={classes.PersonIcon}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="email"
                        name="email"
                        error={!email.isValid}
                        color="secondary"
                        value={logindata.email}
                        onChange={this.handleTextInput}
                        autoFocus={true}
                        margin={'dense'}
                        required={true}
                        label="أدخل اسم المستخدم"
                      />
                    </Grid>
                    <Grid item>
                      <FormControl error>
                        <FormHelperText
                          id="email-error-text"
                          className={classes.textError}
                        >
                          {email.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="flex-end"
                    className={classes.gutterBottom}
                  >
                    <Grid item>
                      <LockIcon
                        color="disabled"
                        className={classes.PasswordIcon}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl className={classes.PasswordText}>
                        <InputLabel htmlFor="standard-adornment-password">
                          أدخل كلمة مرور
                        </InputLabel>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={logindata.password}
                          onChange={this.handleTextInput}
                          required={true}
                          name="password"
                          error={!password.isValid}
                          color="secondary"
                          label="Enter your password"
                          margin={'dense'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl error>
                        <FormHelperText
                          id="password-error-text"
                          className={classes.textError}
                        >
                          {password.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item>
                    {this.renderAction()}
                    <Box classes={{ root: classes.root }} m={4}>
                      <Button
                        size="large"
                        color="secondary"
                        variant="contained"
                        type="submit"
                        className={classes.btnLogin}
                      >
                        تسجيل دخول
                      </Button>
                    </Box>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(LoginStyles)(Login);

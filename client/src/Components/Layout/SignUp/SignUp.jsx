import 'date-fns';
import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import LoaderProgress from '../../Common/LoaderProgress';

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormHelperText,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
  s,
} from '@material-ui/core';

import {
  Person,
  AlternateEmail,
  Phone,
  Lock,
  DateRange,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import {
  validateEmail,
  stringValidation,
  phoneValidation,
} from '../../../helpers/Validation';

import queryString from 'query-string';
import Cookies from 'js-cookie';
import SignUpStyle from './SignUpStyle';
import swal from 'sweetalert';

class SignUp extends Component {
  state = {
    userDetails: {
      name: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
      },
      phone: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
      },
      email: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
      },
      password: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
      },
      rePassword: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
      },
    },
    showPassword: false,
    showRePassword: false,
    returnUrlText: '/',
    redirect: false,
    loginLink: '/user/login',
    birthDate: '',
    minDate: '',
    maxDate: '',
    isLoading: false,
    displayBlock: true,
  };

  componentDidMount() {
    // max age of member must be less than 100 year
    // actually Do not happen , but it type of validation
    const min = new Date();
    min.setDate(1);
    min.setMonth(0);
    min.setFullYear(min.getFullYear() - 100);

    // the member age at least 4 years
    const max = new Date();
    max.setFullYear(max.getFullYear() - 4);

    const AuthToken = Cookies.get('AuthToken');
    const qstring = queryString.parse(this.props.history.location.search);
    if (qstring.ReturnUrl) {
      this.setState({
        returnUrlText: qstring.ReturnUrl,
        loginLink: `/user/login/?ReturnUrl=${qstring.ReturnUrl}`,
        minDate: min,
        maxDate: max,
        birthDate: min,
      });
    } else {
      this.setState({
        // if the user log in we will redirect to Home
        redirect: !AuthToken ? false : true,
        minDate: min,
        maxDate: max,
        birthDate: min,
      });
    }
  }

  // it form password show icon , from materil ui documentaion
  handleClickShowPassword = () => {
    const showPassword = this.state.showPassword;
    this.setState({
      showPassword: !showPassword,
    });
  };
  // it form password show icon , from material ui documentation
  handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };
  // it form password show icon , from material ui documentation
  handleClickShowRePassword = () => {
    const showRePassword = this.state.showRePassword;

    this.setState({
      showRePassword: !showRePassword,
    });
  };
  // it form password show icon , from material ui documentation
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    const fromInput = this.state.userDetails;
    const { name, phone, email, password, rePassword } = fromInput;

    if (!name.value.trim()) {
      name.message = 'Enter your name, please';
      name.isValid = false;
      formValid = false;
    } else if (!stringValidation(name.value)) {
      // the name  is not Valid
      name.message =
        'Name just contains alphabet characters and just one space between words, Please';
      name.isValid = false;
    } else {
      name.message = '';
      name.isValid = true;
    }

    if (!phone.value.trim()) {
      phone.message = 'Enter your phone number, please';
      phone.isValid = false;
      formValid = false;
    } else if (!phoneValidation(phone.value)) {
      // the phone is not Valid
      phone.message = 'Phone just contains numbers with 10 digits';
      phone.isValid = false;
    } else {
      phone.message = '';
      phone.isValid = true;
    }

    if (email.value.trim() === '') {
      email.message = 'Enter your email, please';
      email.isValid = false;
      formValid = false;
    } else if (!validateEmail(email.value)) {
      // the Email is not Valid
      email.message = 'Enter Valid Email, Please';
      email.isValid = false;
    } else {
      email.message = '';
      email.isValid = true;
    }

    if (!password.value.trim()) {
      password.message = 'Enter password, please';
      password.isValid = false;
      formValid = false;
    } else {
      password.message = '';
      password.isValid = true;
    }

    if (!rePassword.value.trim()) {
      rePassword.message = 'Re-enter your password';
      rePassword.isValid = false;
      formValid = false;
    } else {
      rePassword.message = '';
      rePassword.isValid = true;
    }

    if (
      password.value.trim() &&
      rePassword.value.trim() &&
      password.value.trim() !== rePassword.value.trim()
    ) {
      password.message =
        'the Password not match , Enter password, again please';
      password.isValid = false;
      rePassword.isValid = false;
      formValid = false;
    } else if (
      password.value.trim() &&
      rePassword.value.trim() &&
      password.value.trim() === rePassword.value.trim()
    ) {
      password.message = '';
      password.isValid = true;
      rePassword.isValid = true;
    }

    if (!formValid) {
      this.setState({ userDetails: fromInput });
      return;
    }

    this.setState({ userDetails: fromInput, isLoading: true });

    const data = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      rePassword: rePassword.value,
      birthDate: this.state.birthDate,
    };

    // create axios request to check if email used in db or not
    axios
      .get(`/api/user/checkUserEmail/${email.value}`)
      .then(() => {
        email.message = '';
        email.isValid = true;
        email.isAvailable = true;

        // axios to Create User
        axios
          .post('/api/user/signup', data)
          .then((req) => {
            const datalog = req.data;
            this.setState({ redirect: true });
            swal(datalog.messag);
          })
          .catch((err) => {
            if (err.response.data)
              swal('Error', err.response.data.messag, 'error');

            this.setState({ isLoading: false });
          });
      })
      .catch((err) => {
        email.message = err.response.data.messag;
        email.isValid = false;
        formValid = false;
        email.isAvailable = false;
        this.setState({ userDetails: fromInput, isLoading: false });
        console.log({ ...err });
      });
  };

  handleDateChange = (date) => {
    this.setState({ birthDate: date });
  };

  handleTextInput = (event) => {
    const target = event.target;
    const form = this.state.userDetails;
    form[target.name].value = target.value;
    this.setState({
      userDetails: form,
    });
  };

  renderAction = () => {
    if (this.state.redirect) {
      return window.location.replace(`${this.state.returnUrlText}`);
      // return <Redirect to={this.state.returnUrlText} />;
    }
  };
  render() {
    const { classes } = this.props;
    const {
      isLoading,
      displayBlock,
      userDetails,
      birthDate,
      minDate,
      maxDate,
      showPassword,
      showRePassword,
      loginLink,
    } = this.state;
    const { name, phone, email, password, rePassword } = userDetails;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Paper elevation={3} className={classes.content}>
              <Grid item xs={12}>
                <Typography variant="h4" color="textSecondary">
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Please enter your info to continue.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={this.handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container justify="center">
                    <Grid
                      container
                      spacing={1}
                      alignItems="flex-end"
                      justify="flex-start"
                      className={classes.gutterBottom}
                      justify="center"
                    >
                      <Grid item>
                        <Person color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <TextField
                          name="name"
                          id="name"
                          label="Enter your name "
                          value={name.value}
                          error={!name.isValid}
                          autoFocus={true}
                          required={true}
                          color="secondary"
                          fullWidth={true}
                          onChange={this.handleTextInput}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {name.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      spacing={1}
                      alignItems="flex-end"
                      justify="center"
                      className={classes.gutterBottom}
                    >
                      <Grid item>
                        <Phone color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <TextField
                          name="phone"
                          id="phone"
                          label="Enter your phone"
                          color="secondary"
                          value={phone.value}
                          error={!phone.isValid}
                          margin={'dense'}
                          required={true}
                          fullWidth={true}
                          onChange={this.handleTextInput}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {phone.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      spacing={1}
                      alignItems="flex-end"
                      justify="center"
                      className={classes.gutterBottom}
                    >
                      <Grid item>
                        <AlternateEmail color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <TextField
                          id="email"
                          label="Enter your email"
                          name="email"
                          color="secondary"
                          fullWidth={true}
                          value={email.value}
                          error={!email.isValid}
                          margin={'dense'}
                          required={true}
                          onChange={this.handleTextInput}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {email.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      spacing={1}
                      alignItems="flex-end"
                      className={classes.gutterBottom}
                      justify="center"
                    >
                      <Grid item>
                        <Lock color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <FormControl fullWidth={true}>
                          <InputLabel htmlFor="standard-adornment-password">
                            Enter your password
                          </InputLabel>
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password.value}
                            error={!password.isValid}
                            onChange={this.handleTextInput}
                            required={true}
                            name="password"
                            fullWidth={true}
                            color="secondary"
                            label="Enter your password"
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
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {password.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      spacing={1}
                      alignItems="flex-end"
                      className={classes.gutterBottom}
                      justify="center"
                    >
                      <Grid item>
                        <Lock color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <FormControl fullWidth={true}>
                          <InputLabel htmlFor="standard-adornment-password">
                            Enter your password
                          </InputLabel>
                          <Input
                            id="rePassword"
                            type={showRePassword ? 'text' : 'password'}
                            value={rePassword.value}
                            error={!rePassword.isValid}
                            onChange={this.handleTextInput}
                            required={true}
                            name="rePassword"
                            color="secondary"
                            label="Re-enter your password"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle re-password visibility"
                                  onClick={this.handleClickShowRePassword}
                                  onMouseDown={this.handleMouseDownRePassword}
                                >
                                  {showRePassword ? (
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
                    </Grid>
                    <Grid className={classes.errorTitle} item>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {rePassword.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      spacing={1}
                      alignItems="flex-end"
                      className={classes.gutterBottom}
                      justify="center"
                    >
                      <Grid item>
                        <DateRange color="disabled" />
                      </Grid>
                      <Grid item className={classes.textFieldGrid}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            name="birthDate"
                            label="Enter your Birth Date"
                            color="secondary"
                            clearable
                            disableFuture
                            format="MM/dd/yyyy"
                            value={birthDate}
                            variant="dialog"
                            fullWidth={true}
                            openTo="year"
                            minDate={minDate}
                            maxDate={maxDate}
                            onChange={this.handleDateChange}
                            views={['year', 'month', 'date']}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justify="center"
                      spacing={1}
                      alignItems="flex-end"
                    >
                      {this.renderAction()}
                      <Box m={3}>
                        <Button
                          type="submit"
                          className={classes.signUpBtn}
                          size="small"
                          color="primary"
                          variant="contained"
                        >
                          Sign up
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      justify="center"
                      spacing={1}
                      alignItems="flex-end"
                    >
                      <Typography variant="subtitle2" color="primary">
                        {'Have an account?  '}
                        <Link className={classes.loginLink} to={loginLink}>
                          Login
                        </Link>
                      </Typography>
                    </Grid>
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

export default withStyles(SignUpStyle)(SignUp);

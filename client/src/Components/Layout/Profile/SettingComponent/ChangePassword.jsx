import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff,
  KeyboardBackspace,
  DeleteSweep,
  Save,
} from '@material-ui/icons';

import swal from 'sweetalert';

import axios from 'axios';

const inputObj = {
  password: '',
  isValid: true,
  message: '',
  minLength: 6,
  showPassword: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default ({ setIsLoading }) => {
  const [currentPass, setCurrentPass] = React.useState(inputObj);
  const [newPass, setNewPass] = React.useState(inputObj);
  const [reNewPass, setReNewPass] = React.useState(inputObj);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (prop) => (event) => {
    switch (prop) {
      case 'password':
        setCurrentPass({ ...currentPass, ['password']: event.target.value });
        break;
      case 'newPassword':
        setNewPass({ ...newPass, ['password']: event.target.value });
        break;
      case 'reNewPassword':
        setReNewPass({ ...reNewPass, ['password']: event.target.value });
        break;
    }
  };

  const handleClickShowPassword = (prop) => (event) => {
    switch (prop) {
      case 'password':
        setCurrentPass({
          ...currentPass,
          showPassword: !currentPass.showPassword,
        });
        break;
      case 'newPassword':
        setNewPass({ ...newPass, showPassword: !newPass.showPassword });
        break;
      case 'reNewPassword':
        setReNewPass({ ...reNewPass, showPassword: !reNewPass.showPassword });
        break;
    }
  };

  // password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClearValues = () => {
    setCurrentPass(inputObj);
    setNewPass(inputObj);
    setReNewPass(inputObj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true, true);
    let formValid = true;
    const currentPassword = { ...currentPass };

    const newPassword = { ...newPass };

    const reNewPassword = { ...reNewPass };

    if (!currentPassword.password) {
      currentPassword.message = 'الرجاء ادخال كلمة المرور الحالية';
      currentPassword.isValid = false;
      formValid = false;
    } else if (currentPassword.password.length < currentPassword.minLength) {
      currentPassword.message = `كلمة المرور يجب ان تحتوي على الاقل ${currentPassword.minLength} احرف `;
      currentPassword.isValid = false;
      formValid = false;
    } else {
      currentPassword.message = '';
      currentPassword.isValid = true;
    }

    if (!newPassword.password) {
      newPassword.message = 'الرجاء ادخال كلمة المرور الجديدة';
      newPassword.isValid = false;
      formValid = false;
    } else if (newPassword.password.length < newPassword.minLength) {
      newPassword.message = `كلمة المرور يجب ان تحتوي على الاقل ${newPassword.minLength} احرف `;
      newPassword.isValid = false;
      formValid = false;
    } else {
      newPassword.message = '';
      newPassword.isValid = true;
    }

    if (!reNewPassword.password) {
      reNewPassword.message = 'الرجاء ادخال كلمة تاكيد كلمة المرور';
      reNewPassword.isValid = false;
      formValid = false;
    } else if (reNewPassword.password.length < reNewPassword.minLength) {
      reNewPassword.message = ` تاكيد كلمة المرور يجب ان تحتوي على الاقل  ${reNewPassword.minLength} احرف `;
      reNewPassword.isValid = false;
      formValid = false;
    } else {
      reNewPassword.message = '';
      reNewPassword.isValid = true;
    }

    if (
      newPassword.password.trim() &&
      reNewPassword.password.trim() &&
      newPassword.password.trim() !== reNewPassword.password.trim()
    ) {
      newPassword.message =
        'كلمة المرور غير متطابقة الرجاء اعادةادخال كلمة المرور';

      newPassword.isValid = false;
      newPassword.password = '';

      reNewPassword.isValid = false;
      reNewPassword.password = '';

      formValid = false;
    } else if (
      newPassword.password.trim() &&
      reNewPassword.password.trim() &&
      newPassword.password.trim() === reNewPassword.password.trim()
    ) {
      newPassword.message = '';
      newPassword.isValid = true;
      reNewPassword.isValid = true;
    }

    setCurrentPass(currentPassword);
    setNewPass(newPassword);
    setReNewPass(reNewPassword);

    if (!formValid) {
      setIsLoading(false, true);
      return;
    }

    axios
      .post(`/api/user/changePassword`, {
        currentPass: currentPass.password,
        newPass: newPass.password,
        reNewPass: reNewPass.password,
      })
      .then((result) => {
        const data = result.data;
        setIsLoading(false, true);
        if (result.data.status !== 200) {
          swal('خطا', result.data.messag, 'error');
          return;
        }
        handleClearValues();
        swal('تم', result.data.messag, 'success');
      })
      .catch((err) => {
        console.log('Error', { ...err });
        setIsLoading(false, true);
        if (err.response.data) swal('خطا', err.response.data.messag, 'error');
      });
  };

  const classes = useStyles();

  return (
    <Box component="div" width={1}>
      <Grid container justify="center">
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          method="post"
        >
          <Grid container item style={{ padding: 48 }}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary">
                تغير كلمة المرور
              </Typography>
            </Grid>

            <Grid
              container
              item
              direction="column"
              alignContent="center"
              alignItems="center"
            >
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!currentPass.isValid}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  كلمة المرور الحالية
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={currentPass.showPassword ? 'text' : 'password'}
                  value={currentPass.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('password')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {currentPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {currentPass.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!newPass.isValid}
              >
                <InputLabel htmlFor="new-password">
                  كلمة المرور الجديد
                </InputLabel>
                <Input
                  id="new-password"
                  type={newPass.showPassword ? 'text' : 'password'}
                  value={newPass.password}
                  onChange={handleChange('newPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('newPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {newPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {newPass.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                fullWidth={true}
                error={!reNewPass.isValid}
              >
                <InputLabel htmlFor="re-new-password">
                  تاكيد كلمة المرور
                </InputLabel>
                <Input
                  id="re-new-password"
                  type={reNewPass.showPassword ? 'text' : 'password'}
                  value={reNewPass.password}
                  onChange={handleChange('reNewPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('reNewPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {reNewPass.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className={classes.textError}>
                  {reNewPass.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid container item justify="center">
              <Grid container item xs={6} justify="flex-end">
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={<Save />}
                  >
                    حفظ
                  </Button>
                </Box>
              </Grid>
              <Grid container item xs={6}>
                <Box classes={{ root: classes.root }} m={4}>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleClearValues}
                    startIcon={<DeleteSweep />}
                  >
                    افراغ الحقول
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

import React, { Component } from 'react';

import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { deepOrange } from '@material-ui/core/colors';
import {
  Save,
  DeleteSweep,
  KeyboardBackspace,
  CloudUpload,
  Delete,
  Edit,
  ArrowBack,
} from '@material-ui/icons';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import ar from 'date-fns/esm/locale/ar-SA';

// import df from 'date-fns/esm/locale/ar';
import axios from 'axios';
import LoaderProgress from '../Common/LoaderProgress';
import swal from 'sweetalert';
import { th, tr } from 'date-fns/locale';
const useStyles = (theme) => ({
  root: { 'text-align': 'center' },
  deepOrange: {
    color: deepOrange[400],
  },
  right: { 'text-align': 'right' },
  content: {
    padding: '33px',
    width: '98%',
    // minWidth: 290,
    // maxWidth: 390,
  },
  fullWidth: { width: '100%' },

  imaegBox: {
    width: 365,
    height: 400,
    [theme.breakpoints.down('sm')]: { width: 250, height: 270 },
  },
});

// registerLocale('ru', ru);

class AddHistory extends Component {
  state = {
    data: {
      name: {
        value: '',
        message: '',
        isValid: true,
        isRequired: true,
        type: 'text',
        lable: 'الاسم',
      },

      birthday: {
        type: 'date',
        value: null,
      },
      dateDeath: {
        value: null,
        type: 'date',
      },
    },
    gid: null,
    selectedImage: null,
    displayUploadImage: 'block',
    displayDeleteImage: ' none',
    uploadImageMessages: null,
    profileImageUrl: null,
    public_id: null,
    age: 0,
    isLoading: true,
    displayBlock: false,
  };

  handleClearValues = () => {
    //this.setState({ isLoading: true });
    this.clearDataField(true);
  };

  handleBack = () => {
    // to return the user from where he comes
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setState({ isLoading: false });

    const { editHistoryData, isEdit } = this.props;
    if (isEdit && editHistoryData) {
      this.setHistoryData(editHistoryData);
    }
  }

  componentWillUnmount() {
    console.log('Srtart WillUnmount');
    this.clearDataField();
  }

  handleBirthDayChange = (date) => {
    const form = this.state.data;
    form.birthday.value = date;
    this.setState({ data: form });
    this.getAge(date, this.state.data.dateDeath.value);
  };
  handleDateDeathChange = (date) => {
    const form = { ...this.state.data };
    form.dateDeath.value = date;
    this.setState({ data: form });
    this.getAge(this.state.data.birthday.value, date);
  };

  getAge = (birthday, dateDeath) => {
    if (!birthday) {
      this.setState({ age: 0 });
      return;
    }

    try {
      const today = dateDeath ? new Date(dateDeath) : new Date();
      const birthDate = new Date(birthday);
      const calAge = today.getFullYear() - birthDate.getFullYear();

      try {
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calAge--;
        }
      } catch (err) {}

      this.setState({ age: calAge });
    } catch (err) {
      console.log('error in cal age  :', err);
      this.setState({ age: 0 });
    }
  };

  handleTextInput = (e) => {
    const target = e.target;
    const form = { ...this.state.data };
    form[target.name].value = target.value;
    this.setState({ data: form });
  };

  clearDataField(deleteImage) {
    console.log();
    const { data } = this.state;
    const fromInput = {};

    for (let control of Object.keys(data)) {
      let input = data[control];
      input.value = '';
      input.message = '';
      input.isValid = true;
      fromInput[control] = input;
    }

    fromInput.birthday.value = null;
    fromInput.dateDeath.value = null;

    if (this.state.public_id && deleteImage) {
      this.handleDeleteImageSubmit();
    }

    this.setState({
      data: fromInput,
      displayUploadImage: 'block',
      displayDeleteImage: ' none',
      uploadImageMessages: null,
      profileImageUrl: null,
      public_id: null,
      age: 0,
    });
  }

  handleSubmit = (event, updateAllHistory, isEdit, closeDrawer) => {
    event.preventDefault();

    let formValid = true;
    const { data } = this.state;

    const fromInput = {};

    for (let control of Object.keys(data)) {
      let input = data[control];

      if (input.isRequired && input.type === 'text') {
        if (!input.value.trim()) {
          input.message = `الرجاء ادخال ${input.lable}`;
          input.isValid = false;
          formValid = false;
        } else {
          input.message = '';
          input.isValid = true;
        }
      }

      fromInput[control] = input;
    }

    if (!formValid) {
      this.setState({ data: fromInput });
      swal('خطا', 'الرجاء ادخال جميع البيانات المطلوبه', 'error');
      return;
    }

    this.setState({
      data: fromInput,
      isLoading: true,
      displayBlock: true,
    });

    const postData = {
      name: data.name.value,
      birthday: data.birthday.value,
      dateDeath: data.dateDeath.value,
      profileImageUrl: this.state.profileImageUrl,
      public_id: this.state.public_id,
      age: this.state.age,
    };

    if (isEdit) {
      postData.gid = this.state.gid;
      console.log('Edit postData : ', postData);
    }
    axios
      .post(isEdit ? '/api/editHistory' : '/api/addHistory/', postData)
      .then((res) => {
        if (isEdit) {
          swal('تم', 'تحديث البيانات بنجاح', 'success');
        } else {
          swal('تم', 'اضافة البيانات بنجاح', 'success');
        }
        this.clearDataField();
        if (updateAllHistory) {
          updateAllHistory();
        }
        if (closeDrawer) {
          closeDrawer(false);
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        if (error.response.data) swal(error.response.data.messag);
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  handleUploadImageSubmit = async (event) => {
    if (event.target.files[0].type.startsWith('image/')) {
      this.setState({
        isLoading: true,
        displayBlock: true,
      });

      const formData = new FormData();
      formData.append('Image', event.target.files[0]);
      event.target.value = null;
      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'content-Type': 'multipart/form-data',
          },
        });

        const { url, public_id } = res.data;

        this.setState({
          isLoading: false,
          displayBlock: true,
          displayDeleteImage: 'block',
          displayUploadImage: 'none',
          profileImageUrl: url,
          public_id: public_id,
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log('Error in upload Image', err);
        } else {
          console.log(err.response.data.msg, 'Error in upload Image', err);
        }

        this.setState({
          isLoading: false,
          displayBlock: true,
          profileImageUrl: null,
          public_id: null,
        });

        swal(
          'خطا',
          'عذراً لقد حدث خطا اثناء تحميل الصورة الرجاء المحاولة مرة اخره',
          'error',
        );
      }
    } else {
      this.setState({
        isLoading: false,
        displayBlock: true,
        profileImageUrl: null,
        public_id: null,
      });

      swal('خطا', 'الرجاء اختيار صورة', 'error');
    }
  };

  handleDeleteImageSubmit = async (event) => {
    this.setState({
      isLoading: true,
      displayBlock: true,
    });

    axios
      .delete('/api/deleteUpload', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { public_id: this.state.public_id },
      })
      .then((res) => {
        this.setState({
          isLoading: false,
          displayBlock: true,
          displayDeleteImage: 'none',
          displayUploadImage: 'block',
          profileImageUrl: null,
          public_id: null,
          selectedImage: null,
        });
        swal('تم حدف الصور بنجاح');
      })
      .catch((error) => {
        console.log('Error delete image ', error);

        this.setState({ isLoading: false });

        swal(
          'خطا',
          'عذراً لقد حدث خطا اثناء حذف الصورة الرجاء المحاولة مرة اخره',
          'error',
        );
      });
  };

  setHistoryData = (historyData) => {
    if (!historyData) return;
    const form = { ...this.state.data };
    form.name.value = historyData.name;
    form.birthday.value = historyData.birthday;
    form.dateDeath.value = historyData.datedeath;
    this.setState({
      data: form,
      gid: historyData.gid,
      displayUploadImage: historyData.profileimageurl ? 'none' : 'block',
      displayDeleteImage: historyData.profileimageurl ? 'block' : 'none',
      profileImageUrl: historyData.profileimageurl,
      public_id: historyData.public_id,
      age: historyData.age,
    });
  };

  render() {
    const { classes, updateAllHistory, isEdit, closeDrawer } = this.props;
    const {
      isLoading,
      displayBlock,
      profileImageUrl,
      selectedImage,
      displayUploadImage,
      displayDeleteImage,
      uploadImageMessages,
      age,
    } = this.state;

    const { name, birthday, dateDeath } = this.state.data;

    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    return (
      <Box mt={4} mb={4} component="div" width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} width={1}>
          <Grid container justify="center">
            <Paper elevation={0} className={classes.content}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  اضافة سجل جديد
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <form
                  onSubmit={(e) =>
                    this.handleSubmit(e, updateAllHistory, isEdit, closeDrawer)
                  }
                  noValidate
                  autoComplete="off"
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        required
                        value={name.value}
                        error={!name.isValid}
                        autoFocus={true}
                        id="name"
                        name="name"
                        onChange={this.handleTextInput}
                        placeholder="الاسم"
                        fullWidth={true}
                        label="الاسم"
                        color="secondary"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item className={classes.errorTitle}>
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {name.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} alignItems="flex-end">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ar}>
                      <Grid item xs={12}>
                        <DatePicker
                          clearable="true"
                          autoOk
                          disableFuture
                          variant="dialog"
                          cancelLabel={'الغاء'}
                          okLabel={'تم'}
                          clearLabel={'مسح'}
                          color="secondary"
                          margin="normal"
                          id="birthday"
                          name="birthday"
                          label="تاريخ الولادة"
                          format="MM/dd/yyyy"
                          animateYearScrolling={true}
                          value={birthday.value}
                          onChange={this.handleBirthDayChange}
                          openTo="year"
                          inputVariant="outlined"
                          className={classes.fullWidth}
                          views={['year', 'month', 'date']}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DatePicker
                          clearable="true"
                          autoOk
                          disableFuture
                          cancelLabel={'الغاء'}
                          okLabel={'تم'}
                          clearLabel={'مسح'}
                          variant="dialog"
                          color="secondary"
                          margin="normal"
                          id="dateDeath"
                          name="dateDeath"
                          label="تاريخ الوفاه"
                          format="MM/dd/yyyy"
                          animateYearScrolling={true}
                          value={dateDeath.value}
                          onChange={this.handleDateDeathChange}
                          maxDate={new Date()}
                          openTo="year"
                          inputVariant="outlined"
                          className={classes.fullWidth}
                          views={['year', 'month', 'date']}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: 16, marginBottom: 16 }}
                  >
                    <TextField
                      required
                      value={age}
                      autoFocus={true}
                      id="age"
                      name="age"
                      placeholder="العمر"
                      fullWidth={true}
                      label="العمر"
                      color="secondary"
                      variant="outlined"
                      disabled={true}
                    />
                  </Grid>

                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-end"
                  >
                    <Grid container item xs={12} justify="center">
                      <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{ display: 'none' }}
                        value={selectedImage ? selectedImage : ''}
                        onChange={this.handleUploadImageSubmit}
                        accept="image/*"
                      />
                      <Box display={displayUploadImage}>
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            type="submit"
                            endIcon={<CloudUpload />}
                          >
                            تحميل الصورة الشخصية
                          </Button>
                        </label>
                      </Box>
                      <Box display={displayDeleteImage}>
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          type="submit"
                          onClick={this.handleDeleteImageSubmit}
                          endIcon={<Delete />}
                          style={{ backgroundColor: 'rgb(220 0 78)' }}
                        >
                          حذف الصورة الشخصية
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      xs={12}
                      item
                      container
                      className={classes.errorTitle}
                      justify="center"
                    >
                      <FormControl error className={classes.errorTitle}>
                        <FormHelperText className={classes.textError}>
                          {uploadImageMessages}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <Paper className={classes.imaegBox} elevation={3}>
                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={profileImageUrl}
                        />
                      </Paper>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={isEdit ? 12 : 6}>
                      <Box classes={{ root: classes.root }} m={4}>
                        <Button
                          size={isEdit ? 'large' : 'medium'}
                          color="primary"
                          variant="contained"
                          type="submit"
                          endIcon={isEdit ? <Edit /> : <Save />}
                        >
                          {isEdit ? ' تعديل' : 'حفظ'}
                        </Button>
                      </Box>
                    </Grid>
                    {isEdit ? (
                      ''
                    ) : (
                      <Grid item xs={6}>
                        <Box classes={{ root: classes.root }} m={4}>
                          <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            onClick={this.handleClearValues}
                            endIcon={<DeleteSweep />}
                          >
                            افراغ الحقول
                          </Button>
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Box classes={{ root: classes.root }} m={4}>
                        <Button
                          size="medium"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            if (closeDrawer) {
                              closeDrawer(false);
                            }
                          }}
                          endIcon={<ArrowBack />}
                        >
                          اغلاق
                        </Button>
                      </Box>
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
export default withStyles(useStyles)(AddHistory);

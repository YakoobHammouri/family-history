import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  FilledInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Drawer,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import AddHistory from '../Layout/AddHistory';

import axios from 'axios';
import HistoryCard from './HistoryCard';
import LoaderProgress from '../Common/LoaderProgress';
import swal from 'sweetalert';
import { tr } from 'date-fns/locale';
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '40%',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEdit, SetIsEdit] = React.useState(false);
  const [editHistoryData, SetEditHistoryData] = React.useState(null);

  const [allHistory, setAllHistory] = React.useState([]);
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (open === false) {
      SetIsEdit(false);
      SetEditHistoryData(null);
    }
    setOpen(open);
  };

  useEffect(() => {
    getAllHistory();
  }, []);

  const getAllHistory = () => {
    axios
      .get('/api/getAllHistory')
      .then((res) => {
        const resdata = res.data.data.allHistory;
        try {
          if (!resdata || resdata.length === 0) {
            setIsLoading(false);
          }
        } catch {}

        setAllHistory(resdata);
      })
      .catch((err) => {
        console.log('Error in get All History : ', err);
        swal(
          'خطا',
          'عذرا حدث خطا اثناء تحميل الصفحة الرجاء المحاولة مره اخرى',
          'error',
        );
      });
  };

  const handleSearchChange = (e) => {
    //if (e.target.value.length > 1) {

    setSearchValue(e.target.value);
    const history = [...allHistory];
    const serarch = history.filter((x) => x.name.includes(e.target.value));
    console.log(serarch);
    setSearchHistory(serarch);
    //}
  };

  const handleDeleteHistory = (e, gid, imageId) => {
    if (!gid) return;
    setIsLoading(true);

    swal({
      title: 'هل انت متاكد من حذف هذه البيانات',
      text: 'بمجرد الحذف ، لن تتمكن من استعادة هذه البيانات!',
      icon: 'warning',
      buttons: ['الغاء', 'تم'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete('/api/deleteHistory', {
            headers: { 'Content-Type': 'application/json' },
            data: { id: gid, imageId: imageId },
          })
          .then((res) => {
            const history = [...allHistory];
            history.splice(
              history.findIndex((x) => x.gid === gid),
              1,
            );
            swal('تم حذف البيانات بنجاح', {
              icon: 'success',
            });
            setAllHistory(history);
          })
          .catch((err) => {
            console.log('Error in delete  History : ', { ...err });
            if (err.response.data)
              swal('Error', err.response.data.messag, 'error');
          });
      } else {
      }
    });
  };

  const handleEditHistory = (e, historyData) => {
    SetEditHistoryData(historyData);
    SetIsEdit(true);
    setOpen(tr);
  };

  return (
    <>
      <Grid
        container
        item
        justify="center"
        xs={12}
        spacing={2}
        style={{ marginTop: 24 }}
      >
        <LoaderProgress isLoading={isLoading} />
        <Grid
          container
          item
          xs={12}
          sm={2}
          // style={{ marginTop: 16 }}
          justify="center"
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<AddIcon />}
            onClick={toggleDrawer(true)}
          >
            اضافة
          </Button>
        </Grid>
        <Grid container item xs={12} sm={8} justify="center">
          <Grid item xs={12}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">بحث</InputLabel>
              <FilledInput
                variant="outlined"
                fullWidth={true}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                value={searchValue}
                onChange={handleSearchChange}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {searchValue && searchHistory.length === 0 ? (
            <Box>
              <Typography variant="h5" align="center">
                لا يوجد نتائج مشابه لبحثك
              </Typography>
            </Box>
          ) : searchHistory.length > 0 ? (
            searchHistory.map((item, index) => {
              return (
                <HistoryCard
                  key={index}
                  historyData={item}
                  DeleteHistory={handleDeleteHistory}
                  EditHistory={handleEditHistory}
                />
              );
            })
          ) : (
            allHistory.map((item, index) => {
              if (allHistory.length === index + 1 && isLoading === true) {
                setIsLoading(false);
              }
              return (
                <HistoryCard
                  key={index}
                  historyData={item}
                  DeleteHistory={handleDeleteHistory}
                  EditHistory={handleEditHistory}
                />
              );
            })
          )}
        </Grid>
      </Grid>

      <Drawer
        classes={{ paper: classes.root }}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {
          <AddHistory
            updateAllHistory={() => {
              getAllHistory();
            }}
            editHistoryData={editHistoryData}
            isEdit={isEdit}
            closeDrawer={toggleDrawer(false)}
          />
        }
      </Drawer>
    </>
  );
}

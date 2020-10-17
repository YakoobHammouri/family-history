import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  makeStyles,
  Grid,
  Box,
  Button,
  TextField,
  IconButton,
} from '@material-ui/core';
import {
  DateRange,
  Person,
  Phone,
  AlternateEmail,
  AccountBalance,
  BusinessCenter,
  Business,
  Home,
  BusinessSharp,
  Edit,
  Save,
} from '@material-ui/icons';
import userInfoStyle from './ProfileStyles';
import EditUserInfo from './EdituserInfo';

export default ({ userInfo }) => {
  const [displayEdit, setDisplayEdit] = React.useState('block');
  const [displaySave, setDisplaySave] = React.useState('none');
  const [userInfoData, setUserInfoData] = React.useState({ ...userInfo });
  const {
    user_name,
    phone,
    birth_date,
    email,
    university,
    address,
    profession,
  } = userInfoData;
  const classes = userInfoStyle();
  const handleEditClick = () => {
    setDisplayEdit('none');
    setDisplaySave('block');
  };
  const handleSaveClick = () => {
    setDisplaySave('none');
    setDisplayEdit('block');
  };
  const updateuserinfo = (updatedata) => {
    setUserInfoData(updatedata);
  };
  React.useEffect(() => {
    updateuserinfo({ ...userInfo });
  }, [userInfo]);
  return (
    <Grid container className={classes.savebtn}>
      <Grid item xs={1}>
        <Box display={displayEdit} justify="flex-end">
          {/* <IconButton onClick={handleEditClick} aria-label="edit">
            <Edit />
          </IconButton> */}
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={handleEditClick}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </Box>
      </Grid>

      <List className={classes.userRoot}>
        <Box display={displayEdit}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Person color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={user_name} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Phone color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={phone} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="center">
            <ListItemAvatar>
              <AlternateEmail color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />{' '}
          <ListItem alignItems="center">
            <ListItemAvatar>
              <DateRange color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={new Date(birth_date).toLocaleDateString()} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="center">
            <ListItemAvatar>
              <AccountBalance color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={university} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="center">
            <ListItemAvatar>
              <BusinessCenter color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={profession} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Home color="disabled" fontSize="large" />
            </ListItemAvatar>
            <ListItemText primary={address} />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </Box>

        <Box display={displaySave}>
          {displaySave === 'block' ? (
            <EditUserInfo
              userInfo={userInfoData}
              handleSaveClick={handleSaveClick}
              updateuserinfo={updateuserinfo}
              displaySave={displaySave}
            >
              {' '}
            </EditUserInfo>
          ) : (
            ''
          )}
        </Box>
      </List>
    </Grid>
  );
};

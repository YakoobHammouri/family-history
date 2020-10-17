import React, { Component } from 'react';
import { Grid, Box, Paper, Avatar, Tabs, Tab } from '@material-ui/core';

import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import LoaderProgress from '../../Common/LoaderProgress';
import ProfileTabContainer from '../../Common/TabContainer';
import IndexTabProps from '../../../helpers/IndexTabProps';
import UserInfo from './UserInfo';
import Settings from './Settings';
import Events from './Events';
import swal from 'sweetalert';

const ProfileStyles = (theme) => ({
  dataPaper: {
    width: '90%',
    // margin: 5,
    //'max-width': 310,
    display: 'flex',
    justifyContent: 'center',
  },
});

class Profile extends Component {
  state = {
    tabIndex: 0,
    userEvent: [],
    userInfo: {},
    isLoading: true,
    displayBlock: false,
    direction: 'ltr',
  };

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  componentDidMount() {
    axios
      .get('/api/user/profile')
      .then((result) => {
        this.setState({
          isLoading: false,
          userEvent: result.data.data.userEvents,
          userInfo: result.data.data.userInfo,
        });
      })
      .catch((err) => {
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
        this.setState({ isLoading: false });
      });
  }

  setIsLoading = (loading, isDisplayBlock) => {
    this.setState({ isLoading: loading, displayBlock: isDisplayBlock });
  };
  render() {
    const { classes } = this.props;
    const {
      isLoading,
      displayBlock,
      userInfo,
      tabIndex,
      direction,
      userEvent,
    } = this.state;
    const displayStatus = isLoading && !displayBlock ? 'none' : 'block';

    return (
      <Box component="div" width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Box component="div" display={displayStatus} mt={2} width={1}>
          <Grid container justify="center">
            <Grid container item xs={12} justify="center">
              <Box Component="div" mt={6}>
                <Paper square position="relative">
                  <Tabs
                    value={tabIndex}
                    indicatorColor="secondary"
                    textColor="primary"
                    onChange={this.TabChangeHandler}
                    variant="fullWidth"
                  >
                    <Tab label="info" {...IndexTabProps(0)} />
                    <Tab label="Events" {...IndexTabProps(1)} />
                    <Tab label="Setting" {...IndexTabProps(2)} />
                  </Tabs>
                </Paper>
                <Box mt={1}>
                  <Grid container item justify="center">
                    <Paper className={classes.dataPaper}>
                      <SwipeableViews
                        axis={direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tabIndex}
                        disableLazyLoading={false}
                        disabled={true}
                      >
                        <ProfileTabContainer value={tabIndex} index={0}>
                          <Grid container>
                            <UserInfo userInfo={userInfo} />
                          </Grid>
                        </ProfileTabContainer>
                        <ProfileTabContainer value={tabIndex} index={1}>
                          <Grid container>
                            <Events events={userEvent} />
                          </Grid>
                        </ProfileTabContainer>
                        <ProfileTabContainer value={tabIndex} index={2}>
                          <Grid container>
                            <Settings
                              userInfo={userInfo}
                              setIsLoading={this.setIsLoading}
                            />
                          </Grid>
                        </ProfileTabContainer>
                      </SwipeableViews>
                    </Paper>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
export default withStyles(ProfileStyles)(Profile);

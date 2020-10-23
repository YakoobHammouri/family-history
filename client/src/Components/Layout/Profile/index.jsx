import React, { Component } from 'react';
import { Grid, Box, Paper, Avatar, Tabs, Tab } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import LoaderProgress from '../../Common/LoaderProgress';
import Settings from './Settings';

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
    displayBlock: true,
    direction: 'ltr',
  };

  TabChangeHandler = (event, index) => {
    this.setState({ tabIndex: index });
  };

  componentDidMount() {}

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
                <Box mt={1}>
                  <Grid container item justify="center">
                    <Paper className={classes.dataPaper}>
                      <Settings
                        userInfo={userInfo}
                        setIsLoading={this.setIsLoading}
                      />
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

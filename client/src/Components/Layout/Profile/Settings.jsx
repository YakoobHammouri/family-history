import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ChangePassword from './SettingComponent/ChangePassword';
export default ({ userInfo, setIsLoading }) => {
  return (
    <Grid container>
      <ChangePassword setIsLoading={setIsLoading} />
    </Grid>
  );
};

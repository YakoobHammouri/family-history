import React from 'react';
import { Grid } from '@material-ui/core';
import BurgerMenu from './Burgermenu';
import Logo from './Logo';
import {Typography} from '@material-ui/core'

import {
  userMenuItems,
  anonymousMenuItems,
} from './Burgermenu.config';

import UserAvatar from './UserAvatar';

export default ({
  showlogo,
  showMeun,
  showAvatar,
  isAvatarImage,
  srcImage,
  Name,
  isLogin,
  isAdmin,
}) => {
  const menu =
  
       isLogin === true
      ? userMenuItems()
      : anonymousMenuItems();
  return (
    <Grid item container>
    <Grid item xs={false} md={2} />
    
    <Grid item xs={2} sm={1}>
      <BurgerMenu showMeun={showMeun} menu={menu} />
    </Grid>
    <Grid item xs={10} md={8}>
      <Logo showlogo={showlogo} />
    </Grid>
    <Grid item xs={false} sm={2} />
  </Grid>
  );
};

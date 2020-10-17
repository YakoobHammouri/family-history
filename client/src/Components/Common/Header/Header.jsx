import React from 'react';
import { Grid } from '@material-ui/core';

import Logo from './Logo';
import BurgerMenu from './Burgermenu';

import {
  userMenuItems,
  anonymousMenuItems,
  adminMenuItems,
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
    isAdmin === true
      ? adminMenuItems()
      : isLogin === true
      ? userMenuItems()
      : anonymousMenuItems();
  return (
    <Grid item container>
      <Grid item xs={false} md={2} />
      <Grid item xs={10} md={8}>
        <UserAvatar
          showAvatar={showAvatar}
          isAvatarImage={isAvatarImage}
          srcImage={srcImage}
          Name={Name}
        />
        <Logo showlogo={showlogo} />
      </Grid>
      <Grid item xs={2} sm={1}>
        <BurgerMenu showMeun={showMeun} menu={menu} />
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

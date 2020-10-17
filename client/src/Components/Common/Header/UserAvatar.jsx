import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
  large: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  margin: { margin: 15 },
}));

export default function UserAvatar({
  showAvatar,
  isAvatarImage,
  srcImage,
  Name,
  cssClass,
}) {
  const classes = useStyles();
  if (!showAvatar) return '';
  const css = !cssClass ? classes.large : cssClass;
  const avatar = isAvatarImage ? (
    <Avatar alt={Name} src={srcImage} className={clsx(css, classes.margin)} />
  ) : (
    <Avatar className={clsx(css, classes.margin)}>{GetAvatarName(Name)}</Avatar>
  );

  return avatar;
}

function GetAvatarName(name) {
  try {
    if (!name) return null;
    if (name.length == 2) return name;
    // get First Char of every word in string
    const matches = name.split(' ').map((item) => item.charAt(0));
    if (matches.length === 1) return matches[0].toUpperCase();
    const lastIndex = matches.length - 1;
    return matches[0].toUpperCase() + ' ' + matches[lastIndex].toUpperCase();
  } catch (err) {
    console.log('Get Avatar Name : ', { ...err });
    if (name) {
      return name.charAt(0);
    }
  }
}

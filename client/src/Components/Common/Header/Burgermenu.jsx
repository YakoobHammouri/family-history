import React from 'react';
import clsx from 'clsx';
import './icons.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Icon,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Styles from './style';
class BurgerMenu extends React.Component {
  state = {
    right: false,
    isAuth: false,
    isAdmin: false,
  };

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  list = (anchor, classes, menu) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {menu.map((e, index) => (
          <div key={index}>
            <ListItem button={true}>
              <Link className={classes.link} to={e.to}>
                <Grid container>
                  <ListItemIcon className={classes.iconStyle}>
                    <Icon
                      className={clsx(e.icon, classes.iconStyle)}
                      color="secondary"
                    />
                  </ListItemIcon>

                  <ListItemText primary={e.text} />
                </Grid>
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );

  render() {
    const { classes, menu } = this.props;
    return (
      <React.Fragment>
        <IconButton
          color="secondary"
          aria-label="menu"
          edge="end"
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon classes={{ root: classes.root }} />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={this.state['left']}
          onClose={this.toggleDrawer('left', false)}
        >
          {this.list('left', classes, menu)}
        </Drawer>
      </React.Fragment>
    );
  }
}
export default withStyles(Styles)(BurgerMenu);

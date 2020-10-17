import React, { Component } from 'react';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { EventNote } from '@material-ui/icons';
import EventCard from '../../../Common/Event/EventCard';
import LoaderProgress from '../../../Common/LoaderProgress';
import EventDefaultImg from '../../../../assets/eventDefaultimg.svg';
import swal from 'sweetalert';
import HomeStyle from './HomeStyle';
import axios from 'axios';

class Home extends Component {
  state = {
    eventInDay: [],
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get('/api/admin/getEventsDay')
      .then((result) => {
        this.setState({ eventInDay: result.data.data, isLoading: false });
      })
      .catch((err) => {
        console.log({ ...err });
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
      });
  }
  render() {
    const { classes } = this.props;
    const { eventInDay, isLoading } = this.state;
    const displayStatus = isLoading ? 'none' : 'block';

    const cardEvent =
      eventInDay.length === 0 ? (
        <Paper elevation={6}>
          <Box p={3}>
            <Typography variant="h6" gutterBottom align="center">
              There is not Any Event Today
            </Typography>
          </Box>
        </Paper>
      ) : (
        eventInDay.map((event, index) => {
          return (
            <EventCard
              key={index}
              id={event.gid}
              type="takeAttendance"
              title={event.title}
              hostBy={event.host}
              eventDate={new Date(event.event_date).toLocaleDateString()}
              eventTime={event.event_time}
              imageurl={EventDefaultImg}
            />
          );
        })
      );

    return (
      <Box component="div" p={3} width={1}>
        <LoaderProgress isLoading={isLoading} />
        <Grid container justify="center">
          <Grid container item justify="space-between">
            <Grid item xs={6} justify="flex-start">
              <Box pb={2}>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.eventTitle}
                >
                  Events Day
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              justify="flex-end"
              className={classes.eventDateGrid}
            >
              <Box pb={2}>
                <Card className={classes.dateRoot}>
                  <div className={classes.details}>
                    <CardContent className={classes.cardContent}>
                      <EventNote className={classes.cardIcon} />
                    </CardContent>
                    <div className={classes.dateDiv}>
                      <Typography component="span" className={classes.dateText}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </Box>
            </Grid>
          </Grid>

          <Box Component="div" mt={6} width={1} display={displayStatus}>
            <Grid container item xs={12} justify="center">
              {cardEvent}
            </Grid>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(HomeStyle)(Home);

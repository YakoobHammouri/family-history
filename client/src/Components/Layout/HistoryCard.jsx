import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Grid, TextField, Divider, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 24,
    // backgroundColor: 'rgb(247, 249, 250)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    display: 'block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    width: 300,
    height: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 35,
    paddingBottom: 20,
    paddingTop: 20,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  marginInput: {
    margin: 12,
  },
}));

export default function HistoryCard({
  historyData,
  DeleteHistory,
  EditHistory,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h6"
            variant="h6"
            className={classes.marginInput}
          >
            <TextField
              label="الاسم"
              value={historyData.name}
              disabled={true}
              variant="outlined"
              size="small"
              fullWidth={true}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.marginInput}
          >
            <Grid container>
              <Grid item xs={6} style={{ padding: '8px 0 8px 8px' }}>
                <TextField
                  label="تاريخ الولادة"
                  value={
                    historyData.birthday
                      ? new Date(historyData.birthday).toLocaleDateString()
                      : ''
                  }
                  disabled={true}
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={6} style={{ padding: '8px 8px 8px 0' }}>
                <TextField
                  label="تاريخ الوفاه"
                  value={
                    historyData.dateDeath
                      ? new Date(historyData.dateDeath).toLocaleDateString()
                      : ''
                  }
                  disabled={true}
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Typography>
          <Typography className={classes.marginInput}>
            <TextField
              label="العمر"
              value={historyData.age}
              disabled={true}
              variant="outlined"
              size="small"
              fullWidth={true}
            />
          </Typography>
        </CardContent>
        <Divider />
        <div className={classes.controls}>
          <IconButton
            aria-label="Edit"
            style={{
              backgroundColor: theme.palette.primary.main,
              marginLeft: 24,
            }}
            onClick={(e) => EditHistory(e, historyData)}
          >
            <Edit style={{ color: '#ffffff' }} />
          </IconButton>
          <IconButton
            aria-label="Delete"
            style={{ backgroundColor: 'rgb(220, 0, 0, 0.8)' }}
            onClick={(e) =>
              DeleteHistory(e, historyData.gid, historyData.public_id)
            }
          >
            <Delete style={{ color: '#ffffff' }} />
          </IconButton>
        </div>
      </div>

      <Paper style={{ width: 257, height: 312 }} elevation={3}>
        <img
          style={{ width: '100%', height: '100%' }}
          src={historyData.profileimageurl}
        />
      </Paper>
    </Card>
  );
}

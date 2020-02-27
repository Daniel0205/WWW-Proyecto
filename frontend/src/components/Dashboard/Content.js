import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import axios from "axios";


const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {


  const { classes } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
    .get(
      "http://localhost:8000/api/user"
    )
    .then(response => {
      setUsers(response.data)
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);


  function usersCard(){

    if(users.length===0){
      return (
      <Typography color="textSecondary" align="center">
        No users for this project yet
      </Typography>)
    }
    else{
      return users.map((x)=>
      <Card className={classes.contentWrapper}>
        <CardContent>
        <Typography color='primary' variant='h3'>
          {x.id_user}
        </Typography>
        <Typography color='textPrimary'>
          Name: {x.name}
        </Typography>
        <Typography color='textPrimary'>
          Last name: {x.last_name}
        </Typography>
        <Typography color='textPrimary'>
          type: {x.type}
        </Typography >
          
        </CardContent>
      </Card>)
    }
  }


  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {usersCard()}

    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);

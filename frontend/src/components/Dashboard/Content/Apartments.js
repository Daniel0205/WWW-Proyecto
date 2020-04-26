import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Mapa from "./Mapa.js";

import axios from "axios";
import { connect } from "react-redux";
import { setSelectedItem } from "../../store/selectedItem/action";
import { setSelectedUser } from "../../store/selectedUser/action";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: "40px 16px"
  },
  addWrapper: {
    marginBottom: "16px"
  },
  tomap: {
    margin: '0 auto',
    display: 'flex',
    height: 300,
    width: '90%',
  }
});

function Apartments(props) {

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };
  
  const { classes } = props;
  const [flagToAdd, setflagToAdd] = useState(false);

  const [state, setState] = React.useState({
      latitud: "",
      longitud: "",
      stratum: "",
      id_user:props.credentials.id_user,
      id_electricity_meter:"",
      id_user_client:props.user,
      data: []
  }); 

  
  React.useEffect(() => {
    axios
    .get(
      "http://localhost:8000/api/apartments/"+state.id_user_client
    )
    .then(response => {
      setState({
        ...state,
        data:response.data.map((x)=> {
          return({
          num_contract: x.num_contract,
          lat_address: x.lat_address,
          long_address: x.long_address,
          stratum: x.stratum,
          id_user:x.id_user,
          id_electricity_meter: x.id_electricitymeter,
          id_user_client:x.id_user_client
        })})
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);
  
 function setPosition(event) {

      setState({...state,
        latitud: event.lat_address,
        longitud: event.long_address,
       })
       console.log(state)
  }

  function nothing(event) {
    console.log("callback to not error")
   }

   function sending(event) {
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        console.log({
          lat_address:state.latitud,
          long_address: state.longitud,
          stratum: state.stratum,
          id_user:state.id_user,
          id_electricitymeter:state.id_electricity_meter,
          id_user_client:state.id_user_client
     })
        axios
        .post(
          "http://localhost:8000/api/apartment/create/",
          {
            lat_address:state.latitud,
            long_address: state.longitud,
            stratum: state.stratum,
            id_user:state.id_user,
            id_electricitymeter:state.id_electricity_meter,
            id_user_client:state.id_user_client
       })
        .then(response => {
          console.log(response)              
        })
        .catch(error => {
          console.log(error)
        });
       
      }, 600);
    })
    setflagToAdd(false)

   }

  function AddApartment() {
    if(flagToAdd){
        return(
            <div>
                <Card className={classes.addWrapper}>
                    <CardContent>
                        <TextField
                            name="Latitud"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={state.latitud}
                            label="Latitud"
                            onChange={(x)=>setState({...state,latitud:x.target.value})}
                        />
                        <TextField
                            name="Longitud"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={state.longitud}
                            label="Longitud"
                            onChange={(x)=>setState({...state,longitud:x.target.value})}
                        />
                        <TextField
                            name="stratum"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                            value={state.stratum}
                            label="Stratum"
                            onChange={(x)=>setState({...state,stratum:x.target.value})}
                        />
                        <TextField
                            name="id_electricity_meter"
                            variant="outlined"
                            margin="normal"
                            required
                            type="number"
                            fullWidth
                            value={state.id_electricity_meter}
                            label="Electricity meter"
                            onChange={(x)=>setState({...state,id_electricity_meter:x.target.value})}
                        />
                        <Mapa lat={3.37512} long={-76.537189} callback={setPosition}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={sending}>Submit</Button>
                        <Button size="small" onClick={() => setflagToAdd(false)}>Cacel</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
  }

    let existentApartments = state.data.map((a,i) => {
        return(
            <Card className={classes.addWrapper} key={i}>
                <CardContent>
                    <TextField
                        name="num_contract"
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        value={a.num_contract}
                        label="Number of contract"
                        onChange={(x)=>setState({num_contract:x.target.value})}
                    />
                    <TextField
                        name="Latitud"
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        value={a.lat_address}
                        label="Latitud"
                        />
                    <TextField
                        name="Longitud"
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        value={a.long_address}
                        label="Longitud"
                        />
                    <TextField
                        name="stratum"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        required
                        disabled
                        fullWidth
                        value={a.stratum}
                        label="Stratum"
                    />
                    <TextField
                        name="id_electricity_meter"
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        type="number"
                        fullWidth
                        value={a.id_electricity_meter}
                        label="Electricity meter"
                    />
                    <TextField
                        name="id_user"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        value={a.id_user}
                        label="Employee"
                    />
                    <Mapa lat={a.lat_address} long={a.long_address} callback={nothing}/>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => alert("Esto debería habilitar para edición")}>Edit</Button>
                </CardActions>
            </Card>
            
        );
      });
 
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
                <IconButton
                    onClick={() => setflagToAdd(true)}
                >
                    <AddIcon color="inherit" />
                </IconButton>
            </Grid>
            <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {AddApartment()}
        {existentApartments}
      </div>
    </Paper>
  );
}

Apartments.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item,
    user: state.userReducer.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedItem: item => dispatch(setSelectedItem(item)),
    setSelectedUser: item => dispatch(setSelectedUser(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Apartments));

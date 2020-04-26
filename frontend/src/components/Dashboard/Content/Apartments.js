import React, { useState } from "react";
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import Mapa from "./Mapa.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { EsriProvider } from 'leaflet-geosearch';

import axios from "axios";
import { connect } from "react-redux";
import { setSelectedItem } from "../../store/selectedItem/action";
import { setSelectedUser } from "../../store/selectedUser/action";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
    marginBottom: '5%'
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
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  addwidth: {
    width: '100%',
    marginTop: "6px"
  },
});

const title = (bool)=>{
  if(!bool) return "Edit Substation card"
  else return  "New Substation card"
}

function Apartments(props) {

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };
  
  const { classes } = props;
  const [flagToAdd, setFlagToAdd] = useState(false);

  const [state, setState] = React.useState({
    id_user:props.credentials.id_user,
    id_user_client:props.user,
    data: []
  }); 

  const provider = new EsriProvider();
  
  React.useEffect(consultApartments, []);

  //Action buttons 
  function consultApartments(){
    axios
    .get(
      "http://localhost:8000/api/apartments/"+props.user
    )
    .then(response => {
      setState({
        ...state,
        data:response.data.map((x)=> {
          return({
            num_contract: x.num_contract,
            lat_address: x.lat_address,
            long_address: x.long_address,
            address: x.address,
            stratum: x.stratum,
            id_user:x.id_user_id,
            id_electricity_meter: x.id_electricitymeter_id,
            id_user_client:x.id_user_client_id,
            map:false,
            edit:false,
            new:false
        })})
      })
      setFlagToAdd(false)
      console.log("Esta es la respuesta")
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }
  
  function editApartment(index,edit){
    
    var aux=state.data
    aux[index].edit=edit
    setState({...state,data:aux})
  }

  function takeChoise(data){
    if(data.new)create(data)
    else update(data)
  }
  //--------------------------------------------------------------------------------------------
  //to the server

  function create(x){

    console.log("Datos a enviar jijiji")
    console.log(x)

    axios
    .post(
      "http://localhost:8000/api/apartment/create/",
      {
        lat_address:x.lat_address,
        long_address: x.long_address,
        address: x.address,
        stratum: x.stratum,
        id_user: state.id_user,
        id_electricitymeter: x.id_electricity_meter,
        id_user_client: state.id_user_client
    })
    .then(response => {
      console.log(response)
      if(response.status===201)   consultApartments()           
    })
    .catch(error => {
      console.log(error)
    });
  }

  function update(x){
  
    axios
    .put(
      "http://localhost:8000/api/apartment/update/"+x.num_contract,
      {
        lat_address:x.lat_address,
        long_address: x.long_address,
        address: x.address,
        stratum: x.stratum,
        id_user: state.id_user,
        id_electricitymeter: x.id_electricity_meter,
        id_user_client: state.id_user_client
    })
    .then(response => {
      if(response.status===200) consultApartments()          
    })
    .catch(error => {
      console.log(error)
    });    
  }
  //--------------------------------------------------------------------------------------------

  function showMapFunc(event,map){
    var aux=state.data
    aux[event].map=map
    setState({...state,data:aux})
  }

  function map(showMap,long,lat,index,descrip){
    if(showMap){
      return [
        <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,false)}>Hide map</Button>,
        <Mapa key="map" type={false} lat={lat} long={long} description={descrip}/>      
      ]
    }
    else return <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,true)}>Show map</Button>
  }

  const updateData= index => datos => {
    var aux=state.data;
    
    console.log(datos)

    aux[index].address= datos.description
    aux[index].lat_address= datos.latitud
    aux[index].long_address= datos.longitud

    setState({...state,data:aux})
  } 

  function updateAuxiliar(index,datos){
    var aux=state.data;
    
    console.log(datos)

    aux[index].lat_address= datos.latitud
    aux[index].long_address= datos.longitud

    setState({...state,data:aux})
  }

  const handleChange= index => e =>{
    var aux=state.data;

    switch (e.target.id) {
      case 'stratum':
        aux[index].stratum= e.target.value
        break;
      case 'id_electricity_meter':
        aux[index].id_electricity_meter= e.target.value
        break;
      case 'address':
        aux[index].address= e.target.value
        break;
      default:
        break;
      }

    setState({...state,data:aux})
  }

  function searchAddress(input){

    var aux=state.data;
    var ads = aux[input].address + ", Cali, Valle del Cauca"
    var arr = {}

    provider.search({ query: ads })
    .then(function(result) { 
      console.log(result)

      arr = {latitud: result[0].y,
        longitud:result[0].x,
        descrption:result[0].raw.name}
      
      updateAuxiliar(input,arr)
    });

    
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  function actualApartment(index,a){
    if(!state.data[index].edit){
      var aux = [
      <Typography key="title" className={classes.title} color="textSecondary" gutterBottom>
        Apartment card
      </Typography>,
      <Typography key="id"  variant="h5" component="h2">
        Contract number: #{a.num_contract}
      </Typography>,
      <Typography key="data" className={classes.pos} color="textSecondary">
        <b>Latitud: </b> {a.lat_address} &ensp;
        <b>Longitud: </b> {a.long_address}
        <br/>
        <b>Address: </b> {a.address}
        <br/>
        <b>Stratum: </b> {a.stratum}
        <br/>
        <b>Electricitymeter: </b> {a.id_electricity_meter}
        <br/>
        <b>Operator: </b> {a.id_user}
      </Typography>]
      aux.push(map(a.map,a.long_address,a.lat_address,index,a.num_contract))

      return aux
    }
    else{
      return [<Typography key="title"  variant="h5" component="h2">
                {title(a.new)}
              </Typography>,
              <TextField
                  key="num_contract"
                  variant="outlined"
                  margin="normal"
                  disabled 
                  fullWidth
                  value={a.num_contract}
                  label="Contract number"
              />,
              <TextField
                  key="Latitud"
                  variant="outlined"
                  margin="normal"
                  disabled
                  fullWidth
                  value={a.lat_address}
                  label="Latitud"
              />,
              <TextField
                  key="long_substation"
                  variant="outlined"
                  margin="normal"
                  disabled  
                  fullWidth
                  value={a.long_address}
                  label="Longitud"
              /> ,
              <FormControl className={classes.addwidth} variant="outlined">
                <InputLabel htmlFor="address">Address</InputLabel>
                <OutlinedInput
                    id="address"
                    variant="outlined"
                    margin="normal"  
                    fullWidth
                    value={a.address}
                    label="Address"
                    onChange = {handleChange(index)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Search the address in the map"
                          onClick={() => {searchAddress(index)}}
                          onMouseDown={handleMouseDown}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                /> 
              </FormControl>,
              <TextField
                  id="stratum"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="number"
                  autoFocus
                  value={a.stratum}
                  label="Stratum"
                  onChange = {handleChange(index)}
              />,
              <TextField
                  id="id_electricity_meter"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                  value={a.id_electricity_meter}
                  label="Electriciymeter"
                  onChange = {handleChange(index)}
              />,
              <Typography key="title1"  variant="h5" component="h2">
                Select the position of the Apartment 
              </Typography>,
              <Mapa  key="map" type={true} lat={a.lat_address} long={a.long_address} callback={updateData(index)}/>
            ]
    }
  }

  function AddApartment(){
    var aux=state.data
    aux.push({
      num_contract: "The id will be assigned automatically",
      lat_address: 3.375691261841165,
      long_address: -76.53350830078125,
      address: "",
      stratum: "",
      id_electricity_meter: "",
      map:false,
      edit:true,
      new:true
    })

    setState({...state,data:aux})
    setFlagToAdd(true)
  }

  let existentApartments = state.data.map((a,i) => {
    return(
      <Paper className={classes.paper} key={i}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
                <IconButton disabled={a.edit}
                    onClick={() => editApartment(i,true)}
                >
                    <EditIcon color="inherit" />
                </IconButton>
                <IconButton disabled={!a.edit}
                    onClick={() => takeChoise(state.data[i])}
                >
                    <DoneIcon color="inherit" />
                </IconButton>
                <IconButton disabled={!a.edit}
                    onClick={consultApartments}
                >
                    <CancelIcon color="inherit" />
                </IconButton>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {actualApartment(i,a)}                
      </div>
    </Paper>
    );
  });
 
  console.log(state)
  return (
    <div>
      {existentApartments}
      <Fab aria-label='Add' disabled={flagToAdd} onClick={AddApartment}  className={classes.fab} color='primary'>
        <AddIcon />
      </Fab>
    </div>
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
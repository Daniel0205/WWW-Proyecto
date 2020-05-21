import React, { useState, createElement } from "react";
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
import clsx from 'clsx';
import { EsriProvider } from 'leaflet-geosearch';
import { FormHelperText, useRadioGroup } from '@material-ui/core';
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
  if(!bool) return "Edit Apartament card"
  else return  "New Apartament card"
}

function Apartments(props) {

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };
  const [error, setError] = useState("");
  const [errorAd, setErrorAd] = useState("");
  const { classes } = props;
  const [flagToAdd, setFlagToAdd] = useState(false);

  const [state, setState] = React.useState({
    id_user:props.credentials.id_user,
    id_user_client:props.user,
    data: [],
    dataTransformes: []
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
            active:x.active,
            id_user:x.id_user_id,
            id_electricity_meter: x.id_electricitymeter_id,
            id_user_client:x.id_user_client_id,
            map:false,
            edit:false,
            new:false
        })})
      })
      setFlagToAdd(false)
  
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
    if(data.new)createEM(data)
    else update(data)
  }
  //--------------------------------------------------------------------------------------------
  //to the server

  function consultTransformer(){
    axios
    .get(
      "http://localhost:8000/api/transformer"
    )
    .then(response => {
      setState({
        ...state,
        dataTransformes:response.data.map((x)=> {
          return({
            id_transformer: x.id_transformer,
            lat_transformer: x.lat_transformer,
            long_transformer: x.long_transformer,
        })})
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }

  //Esta función me obtiene la distancia entre 2 puntos
  function getDistance(lat1,lon1,lat2,lon2){
    function rad(x) {
      return x * Math.PI / 180;
    }

    var R = 6378.137;//Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d
  }

  //Esta función me ubica el tranformador más cercalo a la ubicación del apartamento
  function getCloserTransformer(x,y) {

    var actualId = 0
    var actualDistance = 6378.137
    
    for(var i=0 ; i<state.dataTransformes.length ;i++){
      var d = getDistance(x,y,state.dataTransformes[i].lat_transformer,state.dataTransformes[i].long_transformer)
      if(d < actualDistance){
        actualDistance = d
        actualId = state.dataTransformes[i].id_transformer
      }
    }

    return actualId
  }

  function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

  function hoyFecha(){
    var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
        dd = addZero(dd);
        mm = addZero(mm);
 
        return yyyy+'-'+mm+'-'+dd;
}

  //Function to create the Electricitymeter
  function createEM(x){

    var lati = x.lat_address
    var longi = x.long_address

    var transf = getCloserTransformer(lati,longi)

    var fecha = hoyFecha()

    axios
    .post(
      "http://localhost:8000/api/electricitymeter/create/",
      {
        previous_measuring: 0,
        previous_measuring_date: fecha,
        actual_measuring: 0,
        actual_measuring_date: fecha,
        id_transformer: transf
    })
    .then(response => {
      console.log(response)
      if(response.status===201){
        create(x,response.data.id_electricitymeter)
      }      
    })
    .catch(error => {
      console.log(error)
    });
  }

  function create(x,id_em){

    axios
    .post(
      "http://localhost:8000/api/apartment/create/",
      {
        lat_address:x.lat_address,
        long_address: x.long_address,
        address: x.address,
        stratum: x.stratum,
        active:x.active,
        id_user: state.id_user,
        id_electricitymeter: id_em,
        id_user_client: state.id_user_client
    })
    .then(response => {

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
        active:x.active,
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
        <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,false)}>{window.app("Hide map")}</Button>,
        <Mapa key="map" type={false} lat={lat} long={long} description={descrip}/>      
      ]
    }
    else return <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,true)}>{window.app("Show map")}</Button>
  }

  const updateData= index => datos => {
    var aux=state.data;
    
    setErrorAd("")    

    aux[index].address= datos.description
    aux[index].lat_address= datos.latitud
    aux[index].long_address= datos.longitud

    setState({...state,data:aux})
  } 

  function updateAuxiliar(index,datos){
    var aux=state.data;
    


    aux[index].lat_address= datos.latitud
    aux[index].long_address= datos.longitud

    setState({...state,data:aux})
  }

  const handleChange= index => e =>{
    var aux=state.data;



    switch (e.target.id) {
      case 'stratum':
        if(e.target.value.length===0)setError("This field is required")
        else if(!/^[0-9]+$/.test(e.target.value))setError("Enter a valid stratum")
        else setError("")
        aux[index].stratum= e.target.value
        break;
      case 'id_electricity_meter':
        aux[index].id_electricity_meter= e.target.value
        break;
      case 'outlined-adornment-password':
        if(e.target.value.length===0)setErrorAd("This field is required")
        else if(!/^[0-9a-zA-Z,-_#.áéíóú ]+$/.test(e.target.value))setErrorAd("Enter a valid address")
        else setErrorAd("")
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

  const handleChangeActive= index => event => {
    
    var aux=state.data;
    aux[index].active= event.target.value

    setState({...state,data:aux})
  };


  function actualApartment(index,a){

    if(!state.data[index].edit){
      var aux = [
      <Typography key="title" className={classes.title} color="textSecondary" gutterBottom>
        {window.app("Apartment card")}
      </Typography>,
      <Typography key="id"  variant="h5" component="h2">
        {window.app("Contract number")}: #{a.num_contract}
      </Typography>,
      <Typography key="data" className={classes.pos} color="textSecondary">
        <b>{window.app("Latitud")}: </b> {a.lat_address} &ensp;
        <b>{window.app("Longitud")}: </b> {a.long_address}
        <br/>
        <b>{window.app("Address")}: </b> {a.address}
        <br/>
        <b>{window.app("Stratum")}: </b> {a.stratum}
        <br/>
        <b>{window.app("Active")}: </b> {window.app(a.active)}
        <br/>
        <b>{window.app("Electricitymeter")}: </b> {a.id_electricity_meter}
        <br/>
        <b>{window.app("Operator")}: </b> {a.id_user}
      </Typography>]
      aux.push(map(a.map,a.long_address,a.lat_address,index,a.num_contract))

      return aux
    }
    else{
      return [<Typography key="title"  variant="h5" component="h2">
                {window.app(title(a.new))}
              </Typography>,
              <TextField
                  key="num_contract"
                  variant="outlined"
                  margin="normal"
                  disabled 
                  fullWidth
                  value={a.num_contract}
                  label={window.app("Contract number")}
              />,
              <TextField
                  key="Latitud"
                  variant="outlined"
                  margin="normal"
                  disabled
                  fullWidth
                  value={a.lat_address}
                  label={window.app("Latitud")}
              />,
              <TextField
                  key="long_substation"
                  variant="outlined"
                  margin="normal"
                  disabled  
                  fullWidth
                  value={a.long_address}
                  label={window.app("Longitud")}
              /> ,
              <FormControl className={clsx(classes.margin, classes.textField,classes.addwidth)} variant="outlined">
              <InputLabel htmlFor="component-helper">{window.app("Address")}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                helperText={error}
                autoFocus
                error={errorAd!==""}
                value={a.address}
                onChange = {handleChange(index)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {searchAddress(index)}}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText id="component-helper-text">{errorAd}</FormHelperText>
            </FormControl>,
              <TextField
                  id="stratum"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="number"
                  helperText={error}
                  autoFocus
                  error={error!==""}
                  value={a.stratum}
                  label={window.app("Stratum")}
                  onChange = {handleChange(index)}
              />,
              <TextField
                key="active"
                variant="outlined"
                margin="normal"
                select
                fullWidth
                InputProps={{
                  defaultValue:a.active
                }}
                
                onChange={handleChangeActive(index)}
                label={window.app("Active")}
                >
                <option value="true">{window.app("True")}</option>
                <option value="false">{window.app("False")}</option>
              </TextField>,
              <TextField
                  id="id_electricity_meter"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  disabled
                  autoFocus
                  value={a.id_electricity_meter}
                  label={window.app("Electricitymeter")}
                  onChange = {handleChange(index)}
              />,
              <Typography key="title1"  variant="h5" component="h2">
                {window.app("Select the position of the Apartment")}
              </Typography>,
              <Mapa  key="map" type={true} lat={a.lat_address} long={a.long_address} callback={updateData(index)}/>
            ]
    }
  }

  function AddApartment(){
    
    consultTransformer()

    var aux=state.data
    aux.push({
      num_contract: window.app("The id will be assigned automatically"),
      lat_address: 3.375691261841165,
      long_address: -76.53350830078125,
      address: "",
      stratum: "",
      id_electricity_meter: "The electricitymeter will be assigned automatically",
      active:"true",
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
                <IconButton disabled={!a.edit || error!=="" || errorAd!==""}
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

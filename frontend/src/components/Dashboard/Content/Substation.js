import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import Mapa from "./Mapa.js";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { connect } from "react-redux";



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
});

const title = (bool)=>{
  if(!bool) return "Edit Substation card"
  else return  "New Substation card"
}


function Substation(props) {

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };

  const { classes } = props;
  const [flagToAdd, setFlagToAdd] = useState(false);
  const [error, setError] = useState("");

  const [state, setState] = React.useState({
    data: []
  });   
  
  React.useEffect(consultSubstation, []);
  
  function consultSubstation(){
    axios
    .get(
      "http://localhost:8000/api/substation"
    )
    .then(response => {
      if(response.status===200){
        setState({
          data:response.data.map((x)=> {
            return({
              id_substation: x.id_substation,
              sector_name: x.sector_name,
              lat_substation: x.lat_substation,
              long_substation: x.long_substation,
              active:x.active,
              map:false,
              edit:false,
              new:false
          })})
        })
        setFlagToAdd(false)
      }
 
    })
    .catch(error => {
      console.log(error)
    });
  }

  function addSubstation(){
    var aux=state.data
    aux.push({
      id_substation: window.app("The id will be assigned automatically"),
      sector_name: "",
      lat_substation: 3.375691261841165,
      long_substation: -76.53350830078125,
      active:"true",
      map:false,
      edit:true,
      new:true
    })
  
    setState({data:aux})
    setFlagToAdd(true)
  }


  function changeFunction(index,x){

    

    if(x.target.value.length===0)setError("This field is required")
    else if(!/^[0-9a-zA-Z,-_#.áéíóú ]+$/.test(x.target.value))setError("Enter a valid adress")
    else setError("")

    var aux = state.data
    aux[index].sector_name=x.target.value

    setState({...state,data:aux})
  }

  
  function update(x){
  
    axios
    .put(
      "http://localhost:8000/api/substation/update/"+x.id_substation,
      {
        sector_name: x.sector_name,
        lat_substation: x.lat_substation,
        long_substation: x.long_substation,
        active:x.active
    })
    .then(response => {
      if(response.status===200) consultSubstation()          
    })
    .catch(error => {
      console.log(error)
    });    

  }

  function create(x) {
    axios
    .post(
      "http://localhost:8000/api/substation/create/",
      {
        sector_name: x.sector_name,
        lat_substation: x.lat_substation,
        long_substation: x.long_substation,
        active:x.active
    })
    .then(response => {

      if(response.status===201)   consultSubstation()           
    })
    .catch(error => {
      console.log(error)
    });
  }

   function takeChoise(data){
     if(data.new)create(data)
     else update(data)
   }


  function showMapFunc(event,map){
    var aux=state.data
    aux[event].map=map
    setState({...state,data:aux})
  }

  function editSubstation(index,edit){
    
    var aux=state.data
    aux[index].edit=edit
    setState({...state,data:aux})
  }


  const updateData= index => datos => {
    var aux=state.data;
    

    aux[index].sector_name= datos.description
    aux[index].lat_substation= datos.latitud
    aux[index].long_substation= datos.longitud

    setError("")
    setState({...state,data:aux})
  
  } 

  const handleChange= index => event => {
    var aux=state.data;
    aux[index].active= event.target.value
    
    setState({...state,data:aux})
  };




  function map(showMap,long,lat,index,descrip){
    if(showMap){
      return [
        <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,false)}>{window.app("Hide map")}</Button>,
        <Mapa key="map" type={false} lat={lat} long={long} description={descrip}/>      
      ]
    }
    else return <Button key="button" id={index} onClick={x=>showMapFunc(x.currentTarget.id,true)}>{window.app("Show map")}</Button>
  }


  function actualSubstation(index,a){

    if(!state.data[index].edit){
      var aux = [
      <Typography key="title" className={classes.title} color="textSecondary" gutterBottom>
        {window.app("Substation Card")}
      </Typography>,
      <Typography key="id"  variant="h5" component="h2">
        {window.app("Substation")} id: #{a.id_substation}
      </Typography>,
      <Typography key="data" className={classes.pos} color="textSecondary">
        <b>{window.app("Address")}:</b> {a.sector_name}
        <br/>
        <b>{window.app("Active")}:</b> {window.app(a.active)}
        <br/>
        <b>{window.app("Latitud")}: </b> {a.lat_substation} &ensp;
        <b>{window.app("Longitud")}: </b> {a.long_substation}
      </Typography>]
      aux.push(map(a.map,a.long_substation,a.lat_substation,index,a.sector_name))

      return aux
    }
    else{
      return [<Typography key="title"  variant="h5" component="h2">
                {title(a.new)}
              </Typography>,
              <TextField
                  key="id_substation"
                  variant="outlined"
                  margin="normal"
                  disabled 
                  fullWidth
                  value={a.id_substation}
                  label={"ID"+window.app("Substation")}
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
                
                onChange={handleChange(index)}
                label={window.app("Active")}
                >
                <option value="true">{window.app("True")}</option>
                <option value="false">{window.app("False")}</option>
              </TextField>,
              <TextField
                  key="sector_name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  helperText={error}
                  autoFocus
                  error={error!==""}
                  value={a.sector_name}
                  defaultValue={a.sector_name}
                  onChange={(x)=>changeFunction(index,x)}
                  label={window.app("Address")}
              />,
              <TextField
                  key="Latitud"
                  variant="outlined"
                  margin="normal"
                  disabled
                  fullWidth
                  value={a.lat_substation}
                  label={window.app("Latitud")}
              />,
              <TextField
                  key="long_substation"
                  variant="outlined"
                  margin="normal"
                  disabled  
                  fullWidth
                  value={a.long_substation}
                  label={window.app("Longitud")}
              /> ,
              <Typography key="title1"  variant="h5" component="h2">
                {window.app("Select the position of the substation ")}
              </Typography>,
              <Mapa  key="map" type={true} lat={a.lat_substation} long={a.long_substation} callback={updateData(index)}/>
            ]
    }
  }

  console.log(state)

  let existentSubstation = state.data.map((a,i) => {
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
                        onClick={() => editSubstation(i,true)}
                    >
                        <EditIcon color="inherit" />
                    </IconButton>
                    <IconButton disabled={!a.edit || error!==""}
                        onClick={() => takeChoise(state.data[i])}
                    >
                        <DoneIcon color="inherit" />
                    </IconButton>
                    <IconButton disabled={!a.edit}
                        onClick={consultSubstation}
                    >
                        <CancelIcon color="inherit" />
                    </IconButton>
                </Grid>
                
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            {actualSubstation(i,a)}                
          </div>
        </Paper>            
      );
    });

  
 
  return (
    <div>
      {existentSubstation}
      <Fab aria-label='Add' disabled={flagToAdd} onClick={addSubstation}  className={classes.fab} color='primary'>
        <AddIcon />
      </Fab>
    </div>
  );
}

Substation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item,
    user: state.userReducer.user
  };
};


export default connect(mapStateToProps)(withStyles(styles)(Substation));

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
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Mapa from "./Mapa.js";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import { connect } from "react-redux";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
    marginBottom: "5%",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  addWrapper: {
    marginBottom: "16px",
  },
  tomap: {
    margin: "0 auto",
    display: "flex",
    height: 300,
    width: "90%",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

const title = (bool) => {
  if (!bool) return "Edit Transformer card";
  else return "New Transformer card";
};

function Transformer(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };

  const { classes } = props;
  const [flagToAdd, setFlagToAdd] = useState(false);
  const [state, setState] = React.useState({ data: [] });
  const [substationsIds, setSubstationsIds] = React.useState([]);

  //Fetch Transformers
  React.useEffect(consultTransformer, []);
  function consultTransformer() {
    axios
      .get("http://localhost:8000/api/transformer")
      .then((response) => {
        if (response.status === 200) {
          setState({
            data: response.data.map((x) => {
              return {
                id_transformer: x.id_transformer,
                tension_level: x.tension_level,
                lat_transformer: x.lat_transformer,
                long_transformer: x.long_transformer,
                id_substation: x.id_substation,
                map: false,
                edit: false,
                new: false,
              };
            }),
          });
          setFlagToAdd(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //List available Substations for new Transformers
  React.useEffect(consultSubstation, []);
  function consultSubstation() {
    axios
      .get("http://localhost:8000/api/substation")
      .then((response) => {
        if (response.status === 200) {
          let a = [];
          response.data.map((x) => a.push(parseInt(x.id_substation)));
          setSubstationsIds(a);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //add template for Create
  function addTransformer() {
    var aux = state.data;
    aux.push({
      id_transformer: window.app("The id will be assigned automatically"),
      tension_level: 1,
      lat_transformer: 3.375691261841165,
      long_transformer: -76.53350830078125,
      id_substation: 1, 
      map: false,
      edit: true,
      new: true,
    });
    setState({ data: aux });
    setFlagToAdd(true);
  }

  //Update state
  function changeFunction(index, event) {
    var aux = state.data;
    aux[index].tension_level = event.target.value;
    setState({ ...state, data: aux });
  }

  //Update Database after edit Transformers
  function update(transformer) {
    axios
      .put(
        "http://localhost:8000/api/transformer/update/" +
          transformer.id_transformer,
        {
          tension_level: transformer.tension_level,
          lat_transformer: transformer.lat_transformer,
          long_transformer: transformer.long_transformer,
          id_substation: transformer.id_substation, //important! is a foreing key
        }
      )
      .then((response) => {
        if (response.status === 200) consultTransformer();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Creates a new Transformer in the DB
  function create(transformer) {
    axios
      .post("http://localhost:8000/api/transformer/create/", {
        tension_level: parseInt(transformer.tension_level),
        lat_transformer: parseFloat(transformer.lat_transformer),
        long_transformer: parseFloat(transformer.long_transformer),
        id_substation: parseInt(transformer.id_substation),
      })
      .then((response) => {
        if (response.status === 201) consultTransformer();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //select create or update
  function takeChoise(transformer) {
    if (transformer.new) create(transformer);
    else update(transformer);
  }

  function showMapFunc(event, map) {
    var aux = state.data;
    aux[event].map = map;
    setState({ ...state, data: aux });
  }

  function editTransformer(index, edit) {
    var aux = state.data;
    aux[index].edit = edit;
    setState({ ...state, data: aux });
  }

  const updateData = (index) => (datos) => {
    var aux = state.data;

    // datos.description; // Return an address from Lan-Long <-----
    aux[index].lat_transformer = datos.latitud;
    aux[index].long_transformer = datos.longitud;

    setState({ ...state, data: aux });
  };

  const handleChange = (index) => (event) => {
    var aux = state.data;
    aux[index].id_substation = event.target.value;

    setState({ ...state, data: aux });
  };

  function map(showMap, long, lat, index, descrip) {
    if (showMap) {
      return [
        <Button
          key="button"
          id={index}
          onClick={(event) => showMapFunc(event.currentTarget.id, false)}
        >
          {window.app("Hide map")}
        </Button>,
        <Mapa
          key="map"
          type={false}
          lat={lat}
          long={long}
          description={descrip}
          iconUrl={"transformer.png"}
        />,
      ];
    } else
      return (
        <Button
          key="button"
          id={index}
          onClick={(x) => showMapFunc(x.currentTarget.id, true)}
        >
          {window.app("Show map")}
        </Button>
      );
  }

  //--
  function actualTransformer(index, transformer) {
    if (!state.data[index].edit) {
      var aux = [
        <Typography
          key="title"
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {window.app("Transformer Card")}
        </Typography>,
        <Typography key="id" variant="h5" component="h2">
          {window.app("Transformer")} id: #{transformer.id_transformer}
        </Typography>,
        <Typography key="data" className={classes.pos} color="textSecondary">
          <b>{window.app("Tension Level")}:</b> {transformer.tension_level}
          <br />
          <b>{window.app("Substation Id")}:</b> {transformer.id_substation}
          <br />
          <b>{window.app("Latitude")}: </b> {transformer.lat_transformer} &ensp;
          <b>{window.app("Longitude")}: </b> {transformer.long_transformer}
        </Typography>,
      ];
      aux.push(
        map(
          transformer.map,
          transformer.long_transformer,
          transformer.lat_transformer,
          index,
          transformer.tension_level
        )
      );

      return aux;
    } else {
      return [
        <Typography key="title" variant="h5" component="h2">
          {title(transformer.new)}
        </Typography>,
        <TextField
          key="id_transformer"
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          value={transformer.id_transformer}
          label={"ID" + window.app("Transformer")}
        />,
        <TextField
          key="tension_level"
          variant="outlined"
          margin="normal"
          fullWidth
          autoFocus
          value={transformer.tension_level}
          onChange={(event) => changeFunction(index, event)}
          label={window.app("Tension Level")}
        />,
        <TextField
          key="id_substation"
          variant="outlined"
          margin="normal"
          select
          fullWidth
          InputProps={{
            defaultValue: substationsIds.length ? `${substationsIds[0]}` : "",
          }}
          onChange={handleChange(index)}
          label={window.app("Substation Id")}
        >
          {substationsIds.map((Id) => (
            <option value={Id} key={Id}>
              {Id}
            </option>
          ))}
        </TextField>,
        <TextField
          key="Latitude"
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          value={transformer.lat_transformer}
          label={window.app("Latitude")}
        />,
        <TextField
          key="long_transformer"
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          value={transformer.long_transformer}
          label={window.app("Longitude")}
        />,
        <Typography key="title1" variant="h5" component="h2">
          {window.app("Select the position of the transformer ")}
        </Typography>,
        <Mapa
          key="map"
          type={true}
          lat={transformer.lat_transformer}
          long={transformer.long_transformer}
          callback={updateData(index)}
          iconUrl={"transformer.png"}
        />,
      ];
    }
  }

  //Render the list of transformers in the state
  let existentTransformer = state.data.map((transformer, index) => {
    return (
      <Paper className={classes.paper} key={index}>
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
                  disabled={transformer.edit}
                  onClick={() => editTransformer(index, true)}
                >
                  <EditIcon color="inherit" />
                </IconButton>
                <IconButton
                  disabled={!transformer.edit}
                  onClick={() => takeChoise(state.data[index])}
                >
                  <DoneIcon color="inherit" />
                </IconButton>
                <IconButton
                  disabled={!transformer.edit}
                  onClick={consultTransformer}
                >
                  <CancelIcon color="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          {actualTransformer(index, transformer)}
        </div>
      </Paper>
    );
  });

  return (
    <div>
      {existentTransformer}
      <Fab
        aria-label="Add"
        disabled={flagToAdd}
        onClick={addTransformer}
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

Transformer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Transformer));

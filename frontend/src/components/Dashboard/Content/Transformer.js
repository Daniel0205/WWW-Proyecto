import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import Divider from "@material-ui/core/Divider";
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
  const [substations, setSubstations] = React.useState([]);
  const [error, setError] = React.useState("");

  //Fetch Transformers
  React.useEffect(consultTransformer, []);
  function consultTransformer() {
    axios
      .get("https://univalleapp.herokuapp.com/api/transformer")
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
                active: x.active,
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
      .get("https://univalleapp.herokuapp.com/api/substation")
      .then((response) => {
        if (response.status === 200) {
          let a = [];
          response.data.map((x) =>
            a.push({ id: parseInt(x.id_substation), address: x.sector_name })
          );
          setSubstations(a);
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
      tension_level: 100,
      lat_transformer: 3.3745408041078666,
      long_transformer: -76.53610467910768,
      id_substation: 1,
      active: "true",
      edit: true,
      new: true,
    });
    setState({ data: aux });
    setFlagToAdd(true);
  }

  //Update state
  function changeFunction(index, event) {
    if(event.target.value.length===0)setError("This field is required")
    else if(!/^[0-9]+$/.test(event.target.value))setError("Enter a valid tension")
    else setError("")

    var aux = state.data;
    aux[index].tension_level = event.target.value;
    setState({ ...state, data: aux });
  }

  //Update Database after edit Transformers
  function update(transformer) {
    axios
      .put(
        "https://univalleapp.herokuapp.com/api/transformer/update/" +
          transformer.id_transformer,
        {
          tension_level: transformer.tension_level,
          lat_transformer: transformer.lat_transformer,
          long_transformer: transformer.long_transformer,
          id_substation: transformer.id_substation, //foreing key
          active: transformer.active,
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
      .post("https://univalleapp.herokuapp.com/api/transformer/create/", {
        tension_level: parseInt(transformer.tension_level),
        lat_transformer: parseFloat(transformer.lat_transformer),
        long_transformer: parseFloat(transformer.long_transformer),
        id_substation: parseInt(transformer.id_substation),
        active: transformer.active,
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

  function editTransformer(index, edit) {
    var aux = state.data;
    aux[index].edit = edit;
    setState({ ...state, data: aux });
  }

  const handleChangeIdSub = (index) => (event) => {
    var aux = state.data;
    aux[index].id_substation = event.target.value;

    setState({ ...state, data: aux });
  };

  const handleChangeActive = (index) => (event) => {
    var aux = state.data;
    aux[index].active = event.target.value;

    setState({ ...state, data: aux });
  };

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
          <b>{window.app("Active")}:</b> {window.app(transformer.active)}
          <br />
          <br />
          <Divider variant="fullwitdh" light={true} />
          <br />
          <b>{window.app("Substation Id")}:</b> {transformer.id_substation}
          <br />
          <b>{window.app("Substation Address")}: </b>{" "}
          {substations.map((sub) =>
            sub.id === transformer.id_substation ? sub.address : ""
          )}
        </Typography>,
      ];

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
          type="number"
          InputLabelProps={{
            min: 0
          }}
          required
          helperText={error}
          autoFocus
          error={error!==""}
          value={transformer.tension_level}
          onChange={(event) => changeFunction(index, event)}
          label={window.app("Tension Level")}
          
        />,
        <TextField
          key="active"
          variant="outlined"
          margin="normal"
          select
          fullWidth
          InputProps={{
            defaultValue: transformer.active,
          }}
          onChange={handleChangeActive(index)}
          label={window.app("Active")}
        >
          <option value="true">{window.app("True")}</option>
          <option value="false">{window.app("False")}</option>
        </TextField>,

        <br />,
        <br />,
        <Divider variant="fullwitdh" light={true} />,
        <br />,
        <TextField
          key="id_substation"
          variant="outlined"
          margin="normal"
          select
          fullWidth
          InputProps={{
            defaultValue: transformer.new
              ? `${substations[0].id}`
              : transformer.id_substation,
          }}
          onChange={handleChangeIdSub(index)}
          label={window.app("Substation Id")}
        >
          {substations.map((sub) => (
            <option value={sub.id} key={sub.id}>
              {sub.id}
            </option>
          ))}
        </TextField>,
        <TextField
          key="Address"
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          value={substations.map((sub) =>
            sub.id === transformer.id_substation ? sub.address : ""
          )}
          label={window.app("Address")}
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
                  disabled={!transformer.edit|| error!==""}
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

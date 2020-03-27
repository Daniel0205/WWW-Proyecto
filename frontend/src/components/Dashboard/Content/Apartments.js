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
  }
});

function Apartments(props) {
  const { classes } = props;
  const [flagToAdd, setflagToAdd] = useState(false);

  const [state, setState] = React.useState({
      num_contract: "",
      addres: "",
      stratum: "",
      id_user:"",
      id_electricity_meter:"",
      id_user_client:"",
      data: [
          {
            num_contract: "123",
            addres: "safdz",
            stratum: "2",
            id_user:"124",
            id_electricity_meter:"54",
          },
          {
            num_contract: "152",
            addres: "asf er qwr",
            stratum: "1",
            id_user:"1346",
            id_electricity_meter:"14",
          }
      ]
  }); 


  function AddApartment() {
    if(flagToAdd){
        return(
            <div>
                <Card className={classes.addWrapper}>
                    <CardContent>
                        <TextField
                            name="num_contract"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={state.num_contract}
                            label="Number of contract"
                            onChange={(x)=>setState({num_contract:x.target.value})}
                        />
                        <TextField
                            name="address"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={state.address}
                            label="Address"
                            onChange={(x)=>setState({address:x.target.value})}
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
                            onChange={(x)=>setState({stratum:x.target.value})}
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
                            onChange={(x)=>setState({id_electricity_meter:x.target.value})}
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => alert("Deberia enviar los datos a la base jiji")}>Submit</Button>
                        <Button size="small" onClick={() => setflagToAdd(false)}>Cacel</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
  }

    let existentApartments = state.data.map(a => {
        return(
            <Card className={classes.addWrapper}>
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
                        name="address"
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        value={a.address}
                        label="Address"
                        onChange={(x)=>setState({address:x.target.value})}
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
                        onChange={(x)=>setState({stratum:x.target.value})}
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
                        onChange={(x)=>setState({id_electricity_meter:x.target.value})}
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
                        onChange={(x)=>setState({id_user:x.target.value})}
                    />
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

export default withStyles(styles)(Apartments);

import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../../SnackbarMesssages";

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
  }
});

function Banks(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Identification",
        field: "id",
        editable: "onAdd",
        type: "numeric",
        cellStyle: { textAlign: "center" },
        headerStyle: { textAlign: "center" }
      },
      { title: "Name", field: "name" },
      {
        title: "City",
        field: "city",

        initialEditValue: "Cali",
        lookup: { C: "Cali", B: "Bogota", M: "Medellin" }
      },
      {
        title: "Active",
        field: "active",
        initialEditValue: "true",
        lookup: { true: "True", false: "False" },
        cellStyle: { textAlign: "left", width: 10, maxWidth: 10 },
        headerStyle: { textAlign: "left", width: 10, maxWidth: 10 }
      }
    ],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/bank")
      .then(response => {
        setState({
          columns: state.columns,
          data: response.data.map(x => {
            return {
              id: x.id_bank,
              name: x.name_bank,
              active: x.active,
              city: x.city_bank
            };
          })
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const { classes } = props;
  const [messaje, setMessaje] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <MaterialTable
          style={{
            //backgroundColor: "#ddd",
            padding: "0px 15px"
          }}
          title="Banks"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();

                  axios
                    .post("http://localhost:8000/api/bank/create/", {
                      id_bank: newData.id,
                      name_bank: newData.name,
                      city_bank: newData.city,
                      active: newData.active
                    })
                    .then(response => {
                      console.log(response);
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        //Message Alert
                        setType("success");
                        setMessaje("The Bank was successfully created");
                        setOpen(true);
                        //-------------
                        return { ...prevState, data };
                      });
                    })
                    .catch(error => {
                      //Message Alert
                      setType("error");
                      setMessaje("All fields are required");
                      setOpen(true);
                      //-------------
                      console.log(error);
                    });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  axios
                    .put(
                      "http://localhost:8000/api/bank/update/" + newData.id,
                      {
                        id_bank: newData.id,
                        name_bank: newData.name,
                        city_bank: newData.city,
                        active: newData.active
                      }
                    )
                    .then(response => {
                      console.log(response);
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          //Message Alert
                          setType("success");
                          setMessaje("The Bank was successfully updated");
                          setOpen(true);
                          //-------------
                          return { ...prevState, data };
                        });
                      }
                    })
                    .catch(error => {
                      //Message Alert
                      setType("error");
                      setMessaje("All fields are required");
                      setOpen(true);
                      //-------------
                      console.log(error);
                    });
                }, 600);
              })
          }}
        />
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
        open={open}
        autoHideDuration={3000}
      >
        <SnackbarMesssages
          variant={type}
          onClose={handleClose}
          message={messaje}
        />
      </Snackbar>
    </>
  );
}

export default withStyles(styles)(Banks);

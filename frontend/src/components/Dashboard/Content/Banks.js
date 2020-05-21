import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../../SnackbarMesssages";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
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
}));

export function Banks(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };

  

  const [state, setState] = React.useState({
    columns: [
      {
        title: window.app("Identification"),
        field: "id",
        editable: "onAdd",
        type: "numeric",
        cellStyle: { textAlign: "center" },
        headerStyle: { textAlign: "center" },
      },
      { title: window.app("Name"), field: "name" },
      {
        title: window.app("City"),
        field: "city",

        initialEditValue: "C",
        lookup: { C: "Cali", B: "Bogota", M: "Medellin" },
      },
      {
        title: window.app("Active"),
        field: "active",
        initialEditValue: "true",
        lookup: { true: window.app("True"), false: window.app("False") },
        cellStyle: { textAlign: "left", width: 10, maxWidth: 10 },
        headerStyle: { textAlign: "left", width: 10, maxWidth: 10 },
      },
    ],
    data: [],
  });

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/bank")
      .then((response) => {
        setState({
          columns:[
            {
              title: window.app("Identification"),
              field: "id",
              editable: "onAdd",
              type: "numeric",
              cellStyle: { textAlign: "center" },
              headerStyle: { textAlign: "center" }
            },
            { title: window.app("Name"), field: "name" },
            {
              title: window.app("City"),
              field: "city",
      
              initialEditValue: "C",
              lookup: { C: "Cali", B: "Bogota", M: "Medellin" }
            },
            {
              title: window.app("Active"),
              field: "active",
              initialEditValue: "true",
              lookup: { true: window.app("True"), false: window.app("False") },
              cellStyle: { textAlign: "left", width: 10, maxWidth: 10 },
              headerStyle: { textAlign: "left", width: 10, maxWidth: 10 }
            }
          ],
          data: response.data.map(x => {
            return {
              id: x.id_bank,
              name: x.name_bank,
              active: x.active,
              city: x.city_bank,
            };
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.language]);

  const classes = useStyles();
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
      <Paper className={classes.paper} data-testid="banks-paper">
        <MaterialTable
          style={{
            //backgroundColor: "#ddd",
            padding: "0px 15px",
          }}
          title="Banks"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();

                  axios
                    .post("http://localhost:8000/api/bank/create/", {
                      id_bank: newData.id,
                      name_bank: newData.name,
                      city_bank: newData.city,
                      active: newData.active,
                    })
                    .then(response => {

                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        //Message Alert
                        setType("success");
                        setMessaje(window.app("The Bank was successfully created"));
                        setOpen(true);
                        //-------------
                        return { ...prevState, data };
                      });
                    })
                    .catch((error) => {
                      //Message Alert
                      setType("error");
                      setMessaje(window.app("All fields are required"));
                      setOpen(true);
                      //-------------
                      console.log(error);
                    });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  axios
                    .put(
                      "http://localhost:8000/api/bank/update/" + newData.id,
                      {
                        id_bank: newData.id,
                        name_bank: newData.name,
                        city_bank: newData.city,
                        active: newData.active,
                      }
                    )
                    .then(response => {

                      if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          //Message Alert
                          setType("success");
                          setMessaje(window.app("The Bank was successfully updated"));
                          setOpen(true);
                          //-------------
                          return { ...prevState, data };
                        });
                      }
                    })
                    .catch((error) => {
                      //Message Alert
                      setType("error");
                      setMessaje(window.app("All fields are required"));
                      setOpen(true);
                      //-------------
                      console.log(error);
                    });
                }, 600);
              }),
          }}
        />
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
      </Paper>
    </>
  );
}

export default Banks;

import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../../SnackbarMesssages";

const useStyles = makeStyles(theme => ({
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
}));

export default function UserList(language) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };

  const [state, setState] = React.useState({
    columns: [
      { title: window.app("Identification"), field: "id_user", editable: "onAdd", type: "numeric" },
      { title: window.app("Name"), field: "name", editable: "onAdd" },
      { title: window.app("Surname"), field: "last_name", editable: "onAdd" },
      {
        title: window.app("Type"),
        field: "type",
        initialEditValue: "O",
        lookup: { O: window.app("Operator"), A: window.app("Administrator"), G: window.app("Manager") }
      },
      {
        title: window.app("Active"),
        field: "active",
        initialEditValue: "true",
        lookup: { true: window.app("True"), false:window.app( "False") }
      }
    ],
    data: []
  });

  const [type, setType] = React.useState("error");
  const [messaje, setMessaje] = React.useState("");
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessaje("");
  };


  React.useEffect(() => {
    axios
    .get("http://localhost:8000/api/user")
    .then(response => {
      setState({
        columns: [
          { title: window.app("Identification"), field: "id_user", editable: "onAdd", type: "numeric" },
          { title: window.app("Name"), field: "name", editable: "onAdd" },
          { title: window.app("Surname"), field: "last_name", editable: "onAdd" },
          {
            title: window.app("Type"),
            field: "type",
            initialEditValue: "O",
            lookup: { O: window.app("Operator"), A: window.app("Administrator"), G: window.app("Manager") }
          },
          {
            title: window.app("Active"),
            field: "active",
            initialEditValue: "true",
            lookup: { true: window.app("True"), false:window.app( "False") }
          }
        ],
        data: response.data.map(x => {
          return {
            id_user: x.id_user,
            name: x.name,
            last_name: x.last_name,
            active: x.active,
            type: x.type
          };
        })
      });

    })
    .catch(error => {
      console.log(error);
    });

  },[language]);


  const classes = useStyles();

  function verifyData(data){

    var aux = false
    var aux2 = "error"
    if(data.name.length===0 || data.last_name.length===0 || data.email.length===0)setMessaje("All fields are required")
    else if(!/^[a-zA-Z ]+$/.test(data.name))setMessaje("Enter a valid name [a-zA-Z ]")
    else if(!/^[a-zA-Z ]+$/.test(data.last_name))setMessaje("Enter a valid surname [a-zA-Z ]")
    else if(!/^[0-9a-zA-Z-_.@]+$/.test(data.last_name))setMessaje("Enter a valid email [0-9a-zA-Z-_.@]")
    else {
      setMessaje("The customer was successfully created")
      aux2="success"
      aux=true
    }

    setType(aux2)
   
    return aux
  }

  return (
    <Paper className={classes.paper}>      
      <MaterialTable
        style={{
          padding: "0px 15px"
        }}
        title={window.app("Users")}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();

                axios
                  .post("http://localhost:8000/api/register/", {
                    id_user: newData.id_user,
                    password: "password1234",
                    name: newData.name,
                    last_name: newData.last_name,
                    type: newData.type,
                    active: newData.active,
                    last_login: null,
                    is_admin: true,
                    is_staff: true,
                    is_superuser: true
                  })
                  .then(response => {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
               
                axios
                  .patch(
                    "http://localhost:8000/api/user/update/" + oldData.id_user,
                    {
                      id_user: newData.id_user,
                      name: newData.name,
                      last_name: newData.last_name,
                      type: newData.type,
                      active: newData.active
                    }
                  )
                  .then(response => {

                    if (oldData) {
                      setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
                /*
              }*/
              }, 600);
            })
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
        open={messaje!==""}
        autoHideDuration={2000}
      >
        <SnackbarMesssages
          variant={type}
          onClose={handleClose}
          message={messaje}
        />
      </Snackbar>
    </Paper>
  );
}

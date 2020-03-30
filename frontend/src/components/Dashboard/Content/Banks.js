import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
        field: "id_bank",
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
              id_bank: x.id,
              name: x.name,
              active: x.active,
              city: x.city
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

  return (
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
                    id: newData.id_bank,
                    name: newData.name,
                    active: newData.active,
                    city: newData.city
                  })
                  .then(response => {
                    console.log(response);
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
                  .put(
                    "http://localhost:8000/api/bank/update/" + newData.id_bank,
                    {
                      id: newData.id_bank,
                      name: newData.name,
                      active: newData.active,
                      city: newData.city
                    }
                  )
                  .then(response => {
                    console.log(response);
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
              }, 600);
            })
        }}
      />
    </Paper>
  );
}

export default withStyles(styles)(Banks);

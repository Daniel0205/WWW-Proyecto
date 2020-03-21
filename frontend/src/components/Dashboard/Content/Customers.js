import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

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

const TYPE_CHOICES = [
    {value:"J", label:"Legal"},
    {value:"N",label:"Natural"}
]

const WAY_CHOICES = [
    {value:"L", label:"Online"},
    {value:"F",label:"Physical"},
    {value:"E",label: "Email"}
]

function Customers(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id_user',editable:'onAdd',type: 'numeric' },
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'last_name' },
      { title: 'Email', field: 'email' },
      { title: 'Type', field: 'type', initialEditValue: 'N', lookup: { J: 'Legal', N: 'Natural' },},
      { title: 'Shipping way', field: 'shipping_way', initialEditValue: 'L', lookup: { L: 'Online', F: 'Physical', E:'Email' },},     
    ],
    data: []
  }); 


  React.useEffect(() => {
    axios
    .get(
      "http://localhost:8000/api/client"
    )
    .then(response => {
      setState({
        columns:state.columns,
        data:response.data.map((x)=> {
          return({
            id_user:x.id,
            name: x.name,
            last_name: x.last_name,
            type:x.type,
            email:x.email,
            shipping_way:x.shipping_way
        })})
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);
  
  return (
    <MaterialTable
    title="Customers"
    columns={state.columns}
    data={state.data}
    editable={{
      onRowAdd: newData =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
          
            axios
            .post(
              "http://localhost:8000/api/client/create/",
              {
                id:newData.id_user,
                name: newData.name,
                last_name: newData.last_name,
                type:newData.type,
                email:newData.email,
                shipping_way:newData.shipping_way
           })
            .then(response => {
              console.log(response)
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });                
            })
            .catch(error => {
              console.log(error)
            });
           
          }, 600);
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            console.log(newData)
            console.log(oldData)
            axios
            .put(
              "http://localhost:8000/api/client/update/"+newData.id_user,
              {
                id:newData.id_user,
                name: newData.name,
                last_name: newData.last_name,
                type:newData.type,
                email:newData.email,
                shipping_way:newData.shipping_way
           })
            .then(response => {
              console.log(response)
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }                
            })
            .catch(error => {
              console.log(error)
            });
            /*
            }*/
            
          }, 600);
        }),
    }}
  />
  );
}

Customers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Customers);

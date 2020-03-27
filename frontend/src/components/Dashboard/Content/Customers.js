import React from "react";
import MaterialTable from "material-table";

import axios from "axios";
import { connect } from "react-redux";
import { setSelectedItem } from "../../store/selectedItem/action";


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
          }, 600);
        }),
    }}
    actions={[
      {
        icon: 'house',
        tooltip: 'add apartment',
        onClick: (event, rowData) => props.setSelectedItem("Apartaments")
      }
    ]}
  />
  );
}


const mapStateToProps = state => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedItem: item => dispatch(setSelectedItem(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
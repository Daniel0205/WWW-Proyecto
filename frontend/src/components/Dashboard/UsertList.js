import React from 'react';
import MaterialTable from 'material-table';

import axios from "axios";

export default function MaterialTableDemo() {
  

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id_user',editable:'onAdd',type: 'numeric' },
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'last_name' },
      { title: 'Type', field: 'type', initialEditValue: 'O', lookup: { O: 'Operator', A: 'Administrator', G:'Manager' },},
      { title: 'Active', field: 'active',initialEditValue: 'true',lookup: { true: 'True', false:'False' }},
    ],
    data: []
  });
  
  function typeTo( type){
    switch (type) {
      case 'O': return "Operador"
      case 'A': return "Administrador"
      case 'G': return "Gerente"
    }
  }

  React.useEffect(() => {
    axios
    .get(
      "http://localhost:8000/api/user"
    )
    .then(response => {
      setState({
        columns:state.columns,
        data:response.data.map((x)=> {
          return({
          id_user: x.id_user,
          name: x.name,
          last_name: x.last_name,
          active: x.active,
          type:x.type
        })})
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);

  console.log(state)

  return (
    <MaterialTable
      title="Users"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              /*if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }*/
              
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
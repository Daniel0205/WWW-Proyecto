import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { connect } from "react-redux";
import { setSelectedItem } from "../../store/selectedItem/action";
import { setSelectedUser } from "../../store/selectedUser/action";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import SingleBill from "./Bills/SingleBill";
import { setModalCustomer } from "../../store/selectedModal/action";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";

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

function Customers(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: window.app("Identification"),
        field: "id_user",
        editable: "onAdd",
        type: "numeric",
      },
      { title: window.app("Name"), field: "name" },
      { title: window.app("Surname"), field: "last_name" },
      { title: "Email", field: "email" },
      {
        title: window.app("Type"),
        field: "type",
        initialEditValue: "N",
        lookup: { J: "Legal", N: "Natural" },
      },
      {
        title: window.app("Shipping way"),
        field: "shipping_way",
        initialEditValue: "L",
        lookup: {
          L: window.app("Online"),
          F: window.app("Physical"),
          E: "Email",
        },
      },
    ],
    data: [],
  });

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/client")
      .then((response) => {
        setState({
          columns: state.columns,
          data: response.data.map((x) => {
            return {
              id_user: x.id,
              name: x.name,
              last_name: x.last_name,
              type: x.type,
              email: x.email,
              shipping_way: x.shipping_way,
            };
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const modalState = useSelector((state) => state.modalReducer.Customers);

  React.useEffect(() => {
    setOpen(modalState);
  }, [modalState]);

  console.log(state);
  return (
    <Paper className={classes.paper}>
      <MaterialTable
        style={{
          padding: "0px 15px",
        }}
        title={window.app("Customers")}
        columns={[
          { title: "ID", field: "id_user", editable: "onAdd", type: "numeric" },
          { title: window.app("Name"), field: "name" },
          { title: window.app("Surname"), field: "last_name" },
          { title: "Email", field: "email" },
          {
            title: window.app("Type"),
            field: "type",
            initialEditValue: "N",
            lookup: { J: window.app("Legal"), N: window.app("Natural") },
          },
          {
            title: window.app("Shipping way"),
            field: "shipping_way",
            initialEditValue: "L",
            lookup: {
              L: window.app("Online"),
              F: window.app("Physical"),
              E: "Email",
            },
          },
        ]}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();

                axios
                  .post("http://localhost:8000/api/client/create/", {
                    id: newData.id_user,
                    name: newData.name,
                    last_name: newData.last_name,
                    type: newData.type,
                    email: newData.email,
                    shipping_way: newData.shipping_way,
                  })
                  .then((response) => {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  })
                  .catch((error) => {
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
                    "http://localhost:8000/api/client/update/" +
                      newData.id_user,
                    {
                      id: newData.id_user,
                      name: newData.name,
                      last_name: newData.last_name,
                      type: newData.type,
                      email: newData.email,
                      shipping_way: newData.shipping_way,
                    }
                  )
                  .then((response) => {
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }, 600);
            }),
        }}
        actions={[
          {
            icon: PdfIcon,
            tooltip: window.app("print pdf"),
            onClick: () => {
              props.setModalCustomer(true);
            },
          },
          {
            icon: "house",
            tooltip: window.app("add apartment"),
            onClick: (event, rowData) => {
              props.setSelectedUser(rowData.id_user);
              props.setSelectedItem("Apartments");
            },
          },
        ]}
      />
      <Dialog
        PaperComponent={SingleBill}
        open={open}
        onClose={() => props.setModalCustomer(false)}
      ></Dialog>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item,
    user: state.userReducer.user,
    modalState: state.modalReducer.Customer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedItem: (item) => dispatch(setSelectedItem(item)),
    setSelectedUser: (item) => dispatch(setSelectedUser(item)),
    setModalCustomer: (state) => dispatch(setModalCustomer(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);

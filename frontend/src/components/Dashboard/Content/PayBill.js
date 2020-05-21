import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { connect } from "react-redux";
import { setSelectedItem } from "../../store/selectedItem/action";
import { setSelectedUser } from "../../store/selectedUser/action";

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
      },
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
      header:{
        display: "-webkit-box"
        
      },
      paper: {
        maxWidth: 936,
        margin: "auto",
        overflow: "hidden",
        marginBottom: '5%',
        marginTop: '3%',
        padding: '2% 3%'
      },
      tabsTitle: {
        color: "#00377B",
        fontSize: "20px",
        fontWeight: "normal",
        lineHeight: "26px",
        width: "100%",
        align: "left",
        marginBottom: "3px",
      },
      tabSubtitle: {
        width: "100%",
        align: "left",
        marginBottom: "3px",
      },
      tabTerms: {
        width: "100%",
        align: "left",
        marginBottom: "3px",
        marginTop: "10px",
        fontSize: "13px",
      },
      tf: {
        width: "50%",
        marginBottom: "10px",
      },
      but: {
        align: "rigth",
        borderRadius: "25px",
      },
});

function PayBill(props) {

  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };
  
  const { classes } = props;
  const [payBill, setpayBill] = React.useState("")
  const [openBnf, setopenBnf] = React.useState(false)
  const [openConf, setopenConf] = React.useState(false)
  const [openPaid, setopenPaid] = React.useState(false)

  const [stateBill, setStateBill] = React.useState({
    id_bill: "",
    payment_status: false,
    quantity: "",
    id_electricitymeter: "",
    expedition_date: "",
    due_date: "",
  })

  function createPay(){

    //Primero actualiza el estado del pago en la factura
    axios
    .put(
      "https://univalleapp.herokuapp.com/api/bill/update/"+stateBill.id_bill,
      {
        payment_status: true,
        id_electricitymeter: stateBill.id_electricitymeter,
        expedition_date: stateBill.expedition_date,
        due_date: stateBill.due_date,
        quantity: stateBill.quantity,
    })
    .then(response => {
      if(response.status===200){
          console.log("Actualizo el estado de pago")
          console.log(response)
        }        
    })
    .catch(error => {
      console.log(error)
    });
    //Ahora crea el registro de pago 
    var fecha = new Date();

    fecha.toISOString()

    axios
    .post(
      "https://univalleapp.herokuapp.com/api/payment/create/",
      {
        payment_date: fecha,
        quantity: stateBill.quantity,
        id_bill: stateBill.id_bill,
        id_bank: 555,
        id_user: props.credentials.id_user,
    })
    .then(response => {
      console.log(response)
      if(response.status===201){
        console.log("Se creo el registro del pago")
        console.log(response)
        setopenConf(false)
      }      
    })
    .catch(error => {
      console.log(error)
    });

  }

  //Esta función va a buscar si el id ingresado conincide con el de una factura a pagar
  function handleClick(){
    axios
    .get("https://univalleapp.herokuapp.com/api/bill/"+payBill)
    .then(response => {

      if(response.status===200){
        if(response.data.length===0){
            setopenBnf(true)
        }else{
            if(response.data[0].payment_status){
                setopenPaid(true)
            }else{
                setStateBill({
                    id_bill: response.data[0].id_bill,
                    payment_status: response.data[0].payment_status,
                    quantity: response.data[0].quantity,
                    id_electricitymeter: response.data[0].id_electricitymeter_id,
                    expedition_date: response.data[0].expedition_date,
                    due_date: response.data[0].due_date,
                })
                setopenConf(true)
            }
            
        }
      }
    })
  }


  return (
    <div>
        <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" paragraph className={classes.tabsTitle}>
          {window.app("Make payment")} 
        </Typography>
        <Typography variant="p" paragraph className={classes.tabSubtitle}>
          {window.app("Search Bill")} 
        </Typography>
        <TextField 
                className={classes.tf} 
                value={payBill} 
                label={window.app("Bill identifier")}
                onChange={(event)=> {
                    setpayBill(event.target.value);
                }}
            />
        <br></br>
        <Button 
            className={classes.but} 
            variant="contained" 
            color="primary" 
            onClick={() =>{
                  handleClick()
            }}
        >
            {window.app("Pay")} 
        </Button>

        <Dialog open={openBnf} onClose={() => setopenBnf(false)}>
            <DialogTitle id="simple-dialog-title">{window.app("No bill with id")}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {window.app("Search bill no resuslt")}
                </DialogContentText>
            </DialogContent>
        </Dialog>

        <Dialog open={openConf} onClose={() => setopenConf(false)}>
            <DialogTitle id="simple-dialog-title">{window.app("Bill")}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="p" paragraph className={classes.tabSubtitle}>
                        {window.app("Bill")} {stateBill.id_bill} 
                    </Typography>
                    <Typography variant="p" paragraph className={classes.tabSubtitle}>
                        {window.app("Get payment")} {stateBill.quantity} 
                    </Typography>
                    <Typography variant="p" paragraph className={classes.tabSubtitle}>
                        {window.app("Change payment")}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setopenConf(false)} color="primary">
                    {window.app("Cancel")}
                </Button>
                <Button onClick={() => createPay()} color="primary">
                    {window.app("Create pay")}
                </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openPaid} onClose={() => setopenPaid(false)}>
            <DialogTitle id="simple-dialog-title">{window.app("Paid bill")}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {window.app("Bill already paid")}
                </DialogContentText>
            </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      credentials: state.loginReducer.credentials,
      item: state.itemReducer.item,
      user: state.userReducer.user
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      setSelectedItem: item => dispatch(setSelectedItem(item)),
      setSelectedUser: item => dispatch(setSelectedUser(item))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PayBill));
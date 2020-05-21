import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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

function RecordPayments(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json"
  };

  const [state, setState] = React.useState({
    data: []
  })
  
  const { classes } = props;
  const [document, setDocument] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [openBnf, setopenBnf] = React.useState(false)



  let existentPayments = state.data.map((a,i) => {
    return(
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" paragraph className={classes.tabsTitle}>
          {window.app("Id pay")}# {a.id_payment}
        </Typography>
        <Typography variant="p" paragraph className={classes.tabSubtitle}>
          {window.app("Paid")} {a.quantity}
        </Typography>
        <Typography variant="p" paragraph className={classes.tabSubtitle}>
          {window.app("Date pay")} {a.payment_date}
        </Typography>
        <Typography variant="p" paragraph className={classes.tabSubtitle}>
          {window.app("Bill paid")} {a.id_bill}
        </Typography>
      </Paper>            
    );
  });
  

  function onConsult(){

    if(open){
      return(
        existentPayments
      )
    }
  
  }

  function getPayments(){
    axios
      .get("https://univalleapp.herokuapp.comapi/payment/"+document)
      .then(response => {

        console.log("Respesta")
        console.log(response)
        setState({
          ...state,
          data:response.data.map((x)=> {
            return({
              quantity: x.quantity,
              payment_date: x.payment_date,
              id_bill: x.id_bill,
              id_payment: x.id_payment,
          })})
        }) 
        if(response.status===200){
          if(response.data.length===0){
            setopenBnf(true)
          }else{
            setOpen(true)
          }
          
        }
      })

  }

  function handleClick(){
    getPayments()
    
  }

  return (
    <div className={classes.container}>
          <Paper elevation={3} className={classes.paper}> 
              <Typography variant="h3" paragraph className={classes.tabsTitle}>
                {window.app("Consult RP")}  
              </Typography>
              <Typography variant="p" paragraph className={classes.tabSubtitle}>
                {window.app("Instruc")}
              </Typography>
              <TextField 
                className={classes.tf} 
                value={document} 
                label={window.app("User ID")}
                onChange={(event)=> {
                    setDocument(event.target.value);
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
                {window.app("Consult")}
              </Button>

              {onConsult()}

              <Dialog open={openBnf} onClose={() => setopenBnf(false)}>
                <DialogTitle id="simple-dialog-title">{window.app("No client with id")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {window.app("Search bill no resuslt")}
                    </DialogContentText>
                </DialogContent>
              </Dialog>

          </Paper>

          
        </div>
  );
}

export default withStyles(styles)(RecordPayments);
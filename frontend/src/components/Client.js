import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Background from "./Images/background1.jpg";
import SingleBill from "./Dashboard/Content/Bills/SingleBill";
import Dialog from "@material-ui/core/Dialog";

import '../services/localizationService';
import InitialHeader from './InitialHeader';
import { setSelectedCustomer } from "./store/selectedCustomer/action";
import { setModalCustomer } from "./store/selectedModal/action";
import { setSelectedItem } from "./store/selectedItem/action";
import { setSelectedUser } from "./store/selectedUser/action";
import { useSelector } from "react-redux";
import { connect } from "react-redux";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  container: {
    backgroundImage: `url(${Background})`,
    padding: theme.spacing(8, 0, 6),
  }
}));

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  let val = value +1
  return () => setValue(val); // update the state to force render
}


function Client(props) {
  const classes = useStyles();

  const [consultType, setConsultType] = React.useState("document")
  const [document, setDocument] = React.useState("")
  const [contract, setContract] = React.useState("")

  const [open, setOpen] = React.useState(false);
  const modalState = useSelector((state) => state.modalReducer.Customers); 

  React.useEffect(() => {
    setOpen(modalState);
  }, [modalState]);


  const forceUpdate = useForceUpdate();


  let changeLanguage = (e) => {

    window.changeLanguage(e.target.value);
    forceUpdate()
}

const handleChange = (event) => {
    setConsultType(event.target.value);
  };

function consultForm() {
    switch(consultType){
        case "document":
            return(
                <TextField 
                className={classes.tf} 
                value={document} 
                label={window.app("Document or NIT")}
                onChange={(event)=> {
                    setDocument(event.target.value);
                }}
                />
            )
            break;
        case "contract":
            return(
                <TextField className={classes.tf} 
                value={contract} 
                label={window.app("Contract number")}
                onChange={(event)=> {
                    setContract(event.target.value);
                }}
                />
            )
            break;
        default:
        break;
    }
}

function onConsult(){

  if(modalState){
    if(consultType=="document"){
      return(
        <Dialog
          PaperComponent={SingleBill}
          open={open}
          onClose={() => props.setModalCustomer(false)}
      ></Dialog>
      )
    }else if(consultType=="contract"){
      return(
        <Dialog
          PaperComponent={SingleBill}
          open={open}
          onClose={() => props.setModalCustomer(false)}
      ></Dialog>
      )
    }
  }
  
}

  return (
    <React.Fragment>
      <CssBaseline />
      <InitialHeader callback={changeLanguage}/>
      <main>
        <div className={classes.container}>
          <Paper elevation={3} className={classes.paper}> 
              <Typography variant="h3" paragraph className={classes.tabsTitle}>
                {window.app("Consult services bill")}  
              </Typography>
              <Typography variant="p" paragraph className={classes.tabSubtitle}>
                {window.app("Select option to consult")}
              </Typography>
              <RadioGroup row aria-label="position" name="howconsult" value={consultType} onChange={handleChange}>
                  <FormControlLabel value="document" control={<Radio color="primary" />} label={window.app("With document")} />
                  <FormControlLabel value="contract" control={<Radio color="primary" />} label={window.app("With contract")} />
              </RadioGroup>
              <div>
                  {consultForm()}
              </div>
              <Typography variant="p" paragraph className={classes.tabTerms}>
                {window.app("Info terms")}
              </Typography>
              <Button 
                className={classes.but} 
                variant="contained" 
                color="primary" 
                onClick={
                  (event) => {
                    props.setSelectedCustomer(document);
                    props.setModalCustomer(true);
                  }
                }
              >
                {window.app("Consult")}
              </Button>
          </Paper>

          {onConsult()}

        </div>
       
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
      
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We give you the best energy!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
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
    setSelectedCustomer: (state) => dispatch(setSelectedCustomer(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
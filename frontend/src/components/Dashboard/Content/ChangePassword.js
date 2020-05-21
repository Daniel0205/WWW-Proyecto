import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import axios from "axios";
import { setSelectedItem } from "../../store/selectedItem/action";
import { setSelectedUser } from "../../store/selectedUser/action";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
      padding: theme.spacing(8, 0, 6),
    }
  }));

function ChangePassword(props){
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
        "Content-Type": "application/json"
    };
  
    const classes = useStyles();

    const [actualPassword, setActualPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [openf, setOpenf] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [openS, setOpenS] = React.useState(false);

    const [stateUser, setStateUser] = React.useState({
        id_user: props.credentials.id_user,
        password:"",

    })

    function update(){
        axios
        .put(
            "https://univalleapp.herokuapp.comapi/user/changePW/",{
                id_user: stateUser.id_user,
                name: stateUser.name,
                last_name: stateUser.last_name,
                password: newPassword,
                type: stateUser.type
            }
        )
        .then(response => {
        if(response.status===200)
            setOpenS(true)          
        })
        .catch(error => {
            console.log(error)
        }); 
    }

    function handleClick(){
        axios
        .post("https://univalleapp.herokuapp.comapi/user/verifypw/",{
            id_user: stateUser.id_user,
            password: actualPassword
          }
        ).then(response => {
            
            if(response.data.message=="Equal"){
                if((newPassword===confirmPassword) && (newPassword!="")){
                    setStateUser({
                        id_user: props.credentials.id_user,
                        password:newPassword
                    })

                    update()
                }else{
                    setOpenD(true)
                }
                
            }else{
                setOpenf(true)
            }

        }).catch(error => {
            console.log(error)
        });

    }
    

    return (
        <div>
          <Paper className={classes.paper}>
            <Typography variant="h3" paragraph className={classes.tabsTitle}>
                {window.app("Change your password")}
            </Typography>
            <TextField 
                className={classes.tf} 
                value={actualPassword} 
                label={window.app("Actual password")}
                type="password"
                onChange={(event)=> {
                    setActualPassword(event.target.value);
                }}
            /> <br></br>
            <TextField 
                className={classes.tf} 
                value={newPassword} 
                type="password"
                label={window.app("New password")}
                onChange={(event)=> {
                    setNewPassword(event.target.value);
                }}
            /> <br></br>
            <TextField 
                className={classes.tf} 
                value={confirmPassword}
                type="password"
                label={window.app("Confirm password")}
                onChange={(event)=> {
                    setConfirmPassword(event.target.value);
                }}
            />
            <br></br>
            <br></br>
            <Button 
                className={classes.but} 
                variant="contained" 
                color="primary" 
                onClick={
                  (event) => {
                    handleClick()
                  }
                }
              >
                {window.app("Change password")}
              </Button>

                <Dialog open={openf} onClose={() => setOpenf(false)}>
                    <DialogTitle className={classes.tabsTitle}>{window.app("Not actual")}</DialogTitle>
                </Dialog>

                <Dialog open={openD} onClose={() => setOpenD(false)}>
                    <DialogTitle className={classes.tabsTitle}>{window.app("Not equal")}</DialogTitle>
                </Dialog>

                <Dialog open={openS} onClose={() => setOpenS(false)}>
                    <DialogTitle className={classes.tabsTitle}>{window.app("Changed")}</DialogTitle>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
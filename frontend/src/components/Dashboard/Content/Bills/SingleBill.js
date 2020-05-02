import React from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Template from "./Template";
import DownloadIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Cancel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { setModalCustomer } from "../../../store/selectedModal/action";

//function to save/export in pdf
function saveToPDF(element) {
  var opt = {
    margin: 0,
    filename: "Bill.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, width: 950, height: 1050 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}

//Settings for Modal/Dialog
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    height: 1052,
    maxHeight: "100vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SingleBill(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div style={modalStyle} className={classes.paper}>
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Button
              autoFocus
              variant="outlined"
              color="inherit"
              onClick={() => {
                const element = saveToPDF(document.getElementById("bill"));
                saveToPDF(element);                
              }}
            >
              <DownloadIcon /> &nbsp; {window.app("Save to PDF")}
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              autoFocus
              variant="outlined"
              color="inherit"
              onClick={() => props.setModalCustomer(false)}
            >
              <CloseIcon /> &nbsp;{window.app("Close")}{" "}
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Container>
          <div id="bill">
            <Template />
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setModalCustomer: (state) => dispatch(setModalCustomer(state)),
  };
}

export default connect(null, mapDispatchToProps)(SingleBill);

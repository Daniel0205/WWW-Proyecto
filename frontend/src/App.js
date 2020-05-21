import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import './services/localizationService';
import InitialHeader from './components/InitialHeader';
import Background from "./components/Images/background.jpg";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
      
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    height: "auto",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // padding: theme.spacing(8, 0, 6),
    padding: theme.spacing(14, 0, 14),
  },
  heroButtons: {
    marginTop: theme.spacing(4),  
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#18202c",
    color: theme.palette.common.white,
    // padding: theme.spacing(6),
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  Grid:{
    // display:"-webkit-inline-box",
    // [theme.breakpoints.down('xs')]: {
    //   display:"flex",
    // },
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  header:{
    display: "-webkit-box"
    
  },
  footerIcons:{
    color: theme.palette.common.white,
  }
}));

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  let val = value +1
  return () => setValue(val); // update the state to force render
}


export default function App() {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  
  let changeLanguage = (e) => {
    window.changeLanguage(e.target.value);
    forceUpdate()
}
//classes={classes.background}
{/* <div id="co"><img src={Background} alt="" /></div> */}

  return (
      
    <React.Fragment>

      <CssBaseline />
      <InitialHeader callback={changeLanguage}/> 
      <main>
        
        <div className={classes.heroContent}>
          <Container maxWidth="md">{/* maxWidth=sm */}
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to Energy-Univalle
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Please select the kind of user that you are:
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} className={classes.Grid} justify="center">
                <Grid item xs={4} >
                <div className={classes.root}>
                  <ButtonBase
                      button
                      component={Link}
                      to="/"
                      focusRipple
                      key="Client"
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: "100%",
                      }}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(client.jpg)`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          Client
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                    </div>
                  </Grid>
                  <Grid item xs={0}></Grid>
                  <Grid item  xs={4}>
                    <div className={classes.root}>
                    <ButtonBase
                      button
                      component={Link}
                      to="/login"
                      focusRipple
                      key="Worker"
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: "100%",
                      }}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(worker.jpg)`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          Employee
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>     
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        
        <div className={{alignItems: "center"}}>
        </div>

        <Typography variant="subtitle1" align="center"  component="p">
        <FacebookIcon className={classes.footerIcons}/>&nbsp;&nbsp;
        <TwitterIcon className={classes.footerIcons}/>&nbsp;&nbsp;
        <InstagramIcon className={classes.footerIcons}/>
        <br/>
          We give you the best energy !
        </Typography>

        <Typography variant="body2"  align="center" >
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
          </Typography>

          </footer>
          {/* End footer */}
      </React.Fragment>
  );
}

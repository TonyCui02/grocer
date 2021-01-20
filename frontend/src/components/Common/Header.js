import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as Logo } from "../Images/logo.svg";

import BtnCircle from "../Widgets/BtnCircle";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";

import firebase from "firebase/app";
import "firebase/auth";
import { FilterNone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "white",
    color: "black",
  },
  search: {
    display: (props) => (props.isBrowse ? "block" : "none"),
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  create: {
    margin: 15,
    display: (props) => (props.isBrowse ? "none" : "block"),
  },
  cart: {
    display: (props) => (props.isBrowse ? "Block" : "none"),
  },
  right: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginRight: 0,
    marginLeft: "auto",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props) {
  const classes = useStyles(props);

  const auth = firebase.auth();

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Logo
                height="50"
                width="50"
                className={classes.logo}
                fill="var(--primary)"
              />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.right}>
              <Button variant="contained" color="primary" className={classes.create}>
                Create
              </Button>
              <IconButton
                className={classes.cart}
                color="primary"
                size="large"
                href="/"
              >
                <ShoppingCartIcon />
              </IconButton>
              <BtnCircle logout={() => auth.signOut()} />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );

  // const auth = firebase.auth();

  // return (
  //   <div className={styles.wrapper}>
  //     <div className="container">
  //       <header className={styles.header}>
  //         <div className={styles.headerLogo}>
  //           <a href="/">
  //             <Logo height="50" width="50" className={styles.logo} />
  //           </a>
  //         </div>
  //         <div className={styles.headerRight}>
  //           <div className={styles.cartWrapper}>
  //             <BtnCart />
  //           </div>
  //           <BtnCircle logout={() => auth.signOut()} />
  //         </div>
  //       </header>
  //     </div>
  //   </div>
  // );
}
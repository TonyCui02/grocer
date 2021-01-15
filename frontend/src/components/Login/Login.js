import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import styles from "./Login.module.css";
import LoginButton from "../Widgets/LoginButton";
import Logo from "../Images/logo.svg";

export default function Login(props) {
  //signIn prop allows google and facebook sign in

  return (
    <div className={styles.canvas}>
      <div className={styles.context}>
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="logo" className={styles.logo} />
          </a>
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="logo" className={styles.logo} />
          </a>
        </div>
        <section className={styles.header}>
          <h1>Sign in to continue</h1>
        </section>
        <div className={styles.line} />
        <section className={styles.buttonGrid}>
          <LoginButton
            onClick={props.google}
            text="Continue with Google"
            img="https://developers.google.com/identity/images/g-logo.png"
          />
          <LoginButton
            onClick={props.fb}
            text="Continue with Facebook"
            img="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          />
        </section>
      </div>
      <div className={styles.footer} />
    </div>
  );
}

import React from "react";
import styles from './Footer.module.css';

import { ReactComponent as Logo } from "../Images/logo.svg";

export default function Footer(props) {
  return (
    <section className={styles.footer}>
      <div className="container">
        <Logo
          height="50"
          width="50"
          className={styles.logo}
          fill="var(--txt-grey)"
        />
        <div className={styles.footerText}>
          <p>
            Disclaimer: Grocer is a non-profit initiative that aims to improve
            food security for vulnerable groups in society
          </p>
          <p>
            Product images on this website are courtesy of Woolworths Group (NZ)
            and Foodstuffs (NZ) Ltd
          </p>
        </div>
      </div>
    </section>
  );
}

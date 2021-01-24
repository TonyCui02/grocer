import React, { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";

import Header from "../Common/Header";
import DashboardCard from "./DashboardCard";
import Card from "../Widgets/Card";
import Button from "../Widgets/Button";
import Footer from "../Common/Footer";

import axios from "axios";

import { Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi";
import UserContext from '../../context/UserContext';
import FindDetails from './FindDetails';

export default function Dashboard() {
  const [{ data, isLoading, isError }, setUrl] = useApi();
  const user = useContext(UserContext)

  useEffect(() => {
    setUrl(`/api/v1/items?user=${user.uid}`);
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    console.log(data)
    return (
      <div className={styles.dashboard}>
        <Header />
        <div className="container">
          <main className={styles.main}>
            <div className={styles.banner}>
              <div className={styles.bannerText}>
                <h1 className={styles.bannerHeader}>Your Shopping Cart</h1>
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.shop}>
                <h1>Countdown</h1>
              </span>
              <span className={styles.shop}>
                <h1>Paknsave</h1>
              </span>
            </div>

            <div className={styles.itemGrid}>
              {data.map((item) => (
                <DashboardCard data={item}>
                  <Card shop="count" id={item.count_id} href={`/browse?shop=count`} />
                  <Card shop="pak" id={item.pak_id} href={`/browse?shop=pak`} />
                </DashboardCard>
              ))}
            </div>

            <div className={styles.total}>
              <div className={styles.row}>
                <h1>Total:</h1>
              </div>
              <div className={styles.row}>
                <span className={styles.shop}>
                  <h1>Countdown</h1>
                </span>
                <span className={styles.shop}>
                  <h1>Paknsave</h1>
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.shop}>
                  <h1>$43.8</h1>
                </span>
                <span className={styles.shop}>
                  <h1>$98.7</h1>
                </span>
              </div>
            </div>

            <div>{`${data}`}</div>
          </main>
        </div>

        <Footer />
      </div>
    );
  }
}

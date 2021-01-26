import React, { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";

import Header from "../Common/Header";
import DashboardCard from "./DashboardCard";
import LiveCard from "../Widgets/LiveCard";
import Button from "../Widgets/Button";
import Footer from "../Common/Footer";

import axios from "axios";

import { Redirect } from "react-router-dom";
import UserContext from '../../context/UserContext';
import useApi from '../../hooks/useApi';


export default function Dashboard() {
  const user = useContext(UserContext)
  const [{ data, isLoading, isError }, setUrl] = useApi();
  const [countTotal, setCountTotal] = useState(0);
  const [pakTotal, setPakTotal] = useState(0);


  function setTotal(shop, price) {
    if (price != null) {
      if (shop == 'count') {
        console.log(shop, price)
        setCountTotal(countTotal + parseFloat(price));
      } else {
        setPakTotal(pakTotal + parseFloat(price));
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    if (user) {
      setUrl(`/api/v1/items?user=${user.uid}`);
    }
  })


  if (isLoading) {
    return <div>Loading...</div>;
  } else {
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
                  <LiveCard setTotal={setTotal} shop="count" id={item.count_id} href={`/browse?shop=count&id=${item._id}&name=${item.name}`} changeProduct={false} />
                  <LiveCard setTotal={setTotal} shop="pak" id={item.pak_id} href={`/browse?shop=pak&id=${item._id}&name=${item.name}`} changeProduct={false} />
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
                  <h1>${Math.round(countTotal * 100) / 100}</h1>
                </span>
                <span className={styles.shop}>
                  <h1>${Math.round(pakTotal * 100) / 100}</h1>
                </span>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    );
  }
}

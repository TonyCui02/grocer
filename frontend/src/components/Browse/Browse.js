import React, { useEffect, useState } from "react";

import Header from "../Common/Header";
import styles from './Browse.module.css';
import Card from '../Widgets/Card';
import Footer from '../Common/Footer';


import useApi from '../../hooks/useApi';
import axios from 'axios';

export default function Browse(props) {
  // get shop querystring
  const urlParams = new URLSearchParams(window.location.search);
  const shop = urlParams.get('shop');
  const name = urlParams.get('name')
  const [input, setInput] = useState(name)

  const [{ data, isLoading, isError }, setUrl] = useApi(`/api/v1/products/${shop}?name=${name}&limit=10`);
  
  function onSearch(event) {
    setUrl(`/api/v1/products/${shop}?name=${input}&limit=10`)
    console.log(data)
    event.preventDefault();
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    console.log(input)
    return (
      <div>
        <Header setInput={setInput} onSearch={onSearch} isBrowse={true} />
        <main className={styles.content}>
          <div className={styles.heading}>
            <div className="container">
              <h2>Search Results for</h2>
              <h5>{input}</h5>
              <h6>in <i><em>{shop == 'count' ? "Countdown" : "Paknsave"}</em></i></h6>
            </div>
          </div>
          <div className="container">
            <section className={styles.cardGrid}>
              {data.map((item) =>
                <Card id={item.id} name={item.name} img={item.img} price={item.price} volumeSize={item.volumeSize} href='/' />
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

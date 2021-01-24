import React, { useEffect, useState } from "react";

import Header from "../Common/Header";
import styles from './Browse.module.css';
import Card from '../Widgets/Card';
import Footer from '../Common/Footer';


import useApi from '../../hooks/useApi';
import axios from 'axios';

export default function Browse(props) {
  const [input, setInput] = useState("")
  const [{ data, isLoading, isError }, setUrl] = useApi(`/api/v1/products/pak?name=bread`);

  // get shop querystring
  const urlParams = new URLSearchParams(window.location.search);
  const shop = urlParams.get('shop')


  function onSearch(event) {
    setUrl(`/api/v1/products/${shop}?name=${input}`)
    console.log(data)
    event.preventDefault();
  }

  const handleSubmit = () => {
    alert('test');
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else {
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
                <Card name={item.name} img={item.img} price={item.price} volumeSize={item.volumeSize} href='/' onClick={console.log('test')}/>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

import React, {useEffect} from "react";

import Header from "../Common/Header";
import styles from './Browse.module.css';
import Card from '../Widgets/Card';
import Footer from '../Common/Footer';

import useApi from '../../hooks/useApi';

export default function Browse(props) {
  const [{ data, isLoading, isError }, setUrl] = useApi();
  
  useEffect(() => {
    setUrl(`/api/v1/products/pak?`)
    
  }, [])


  return (
    <div>
      <Header isBrowse={true} />
      <main className={styles.content}>
            <div className={styles.heading}>
                <div className="container">
                    <h2>Search Results for</h2>
                    <h5>Bread</h5>
                    <h6>in <i><em>Countdown</em></i></h6>
                </div>
            </div>
            <div className="container">
                <section className={styles.cardGrid}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </section>
            </div>
      </main>
      <Footer/>
    </div>
  );
}

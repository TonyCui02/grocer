import React, { useState, useRef, useEffect } from "react";
import styles from "./BtnCircle.module.css";

export default function BtnCircle(props) {
  // menuOpen change to styles.dropdownOpen when open
  const [menuOpen, setMenuOpen] = useState("");
  const wrapperRef = useRef(null);

  function handleClick() {
    setMenuOpen(styles.dropdownOpen);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setMenuOpen("");
    }
  };

  return (
    <div className={styles.buttonWrapper} ref={wrapperRef}>
      <button type="button" className={styles.button} onClick={handleClick}>
        T
      </button>
      <div className={`${styles.dropdown} ${menuOpen}`}>
        <div className={styles.menuTop}>
          <button type="button" className={styles.personIcon} onClick={handleClick}>
            T
          </button>
          <div className={styles.userInfo}>
            <h4>Tony Cui</h4>
            <span className={styles.subtitle}>Tonycui02@gmail.com</span>
          </div>
        </div>
        <div className={styles.menuBottom}>
          <ul className={styles.dropdownMenu}>
            <li className={styles.item}>
              <a>My Account</a>
            </li>
            <li className={styles.item}>
              <a href="/" onClick={props.logout}>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from "./style.module.css";
import cn from "classnames";

export const Guests = (): JSX.Element => {
  const [adults12Years, setAdults12Years] = useState(2);
  const [kids11Years, setKids11Years] = useState(1);
  const [babies4Years, setBabies4Years] = useState(0);


  function decrementValue(setValue: Dispatch<SetStateAction<number>>): void {
    setValue(prevValue => prevValue > 1 ? prevValue - 1 : 1);
  }

  function incrementValue(setValue: Dispatch<SetStateAction<number>>): void {
    setValue(prevValue => prevValue + 1);
  }

  return (

    <section className={styles.roomContainer}>

      <h3 className={styles.roomTitle}>Номер 1</h3>

      <div className={styles.rooms}>

        <div className={styles.roomItem}>
          <p>Возраст от 12 лет</p>
          <div className={styles.inputСontainer}>
            <button
              className={styles.button}
              onClick={() => decrementValue(setAdults12Years)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="100"
              value={adults12Years}
              readOnly
              onChange={(e) => setAdults12Years(parseInt(e.target.value))} />
            <button
              className={styles.button}
              onClick={() => incrementValue(setAdults12Years)}>+</button>
          </div>
        </div>

        <div className={styles.roomItem}>
          <p>Возраст до 11 лет</p>
          <div className={cn(styles.inputСontainer, styles.inputСontainerKid)}>
            <button
              className={styles.button}
              onClick={() => decrementValue(setKids11Years)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="100"
              value={kids11Years}
              readOnly
              onChange={(e) => setKids11Years(parseInt(e.target.value))} />
            <button className={styles.button} onClick={() => incrementValue(setKids11Years)}>+</button>
          </div>
        </div>

        <div className={styles.roomItem}>
          <p>Младенцы до 4 лет</p>
          <div className={cn(styles.inputСontainer, styles.inputСontainerKid)}>
            <button
              className={styles.button}
              onClick={() => decrementValue(setBabies4Years)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="100"
              value={babies4Years}
              readOnly
              onChange={(e) => setBabies4Years(parseInt(e.target.value))} />
            <button
              className={styles.button}
              onClick={() => incrementValue(setBabies4Years)}>+</button>
          </div>
        </div>


      </div>

    </section>

  );
};

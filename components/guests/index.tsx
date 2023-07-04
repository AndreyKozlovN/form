import React, { useState, Dispatch, SetStateAction, useEffect, useContext } from 'react';
import styles from "./style.module.css";
import cn from "classnames";
import { BookingContext } from "../../context/booking.context";

interface GuestsCounterProps {
  adults: number,
  kids: number,
  babies: number
  shortPreview?: boolean;
}

export const Guests = (): JSX.Element => {
  const {
    setDescriptionTitle,
    setDescriptionText,
    setGuestsString,
    adults = 2,
    setAdults,
    kids = 0,
    setKids,
    babies = 0,
    setBabies } = useContext(BookingContext)

  function guestsCounter({ adults, kids, babies, shortPreview = false }: GuestsCounterProps) {
    const allKids = kids + babies;
    const allGuests = adults + allKids;

    function stringFormatter(numberOfGuests: number): string {
      let guestsString: string = '';

      const lastTwoDigits: number = Math.abs(numberOfGuests % 100);
      const lastDigit: number = Math.abs(numberOfGuests % 10);

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        guestsString = 'гостей';
      }
      else if (lastDigit === 1) {
        guestsString = 'гость';
      }
      else if (lastDigit >= 2 && lastDigit <= 4) {
        guestsString = 'гостя';
      }
      else {
        guestsString = 'гостей';
      }

      return `${guestsString}`;
    }

    if (!shortPreview) {
      return `${allGuests}  ${stringFormatter(allGuests)}: ${adults} - взрослых, ${allKids} - детей.`
    } else {
      return `${allGuests}  ${stringFormatter(allGuests)}`
    }
  }

  useEffect(() => {
    setDescriptionTitle && setDescriptionTitle(guestsCounter({ adults, kids, babies }))
    setDescriptionText && setDescriptionText(' ')

    setGuestsString && setGuestsString(guestsCounter({ adults, kids, babies, shortPreview: true }))
  }, [adults, kids, babies, setDescriptionTitle, setGuestsString, setDescriptionText])



  function decrementValue(setValue: any): void {
    setValue((prevValue: number) => prevValue >= 1 ? prevValue - 1 : 0);
  }

  function incrementValue(setValue: any): void {
    setValue((prevValue: number) => prevValue != 5 ? prevValue + 1 : 5);
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
              onClick={() => decrementValue(setAdults && setAdults)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="5"
              value={adults}
              readOnly
              onChange={(e) => setAdults && setAdults(parseInt(e.target.value))} />
            <button
              className={styles.button}
              onClick={() => incrementValue(setAdults && setAdults)}>+</button>
          </div>
        </div>

        <div className={styles.roomItem}>
          <p>Возраст до 11 лет</p>
          <div className={cn(styles.inputСontainer, styles.inputСontainerKid)}>
            <button
              className={styles.button}
              onClick={() => decrementValue(setKids)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="0"
              max="1"
              value={kids}
              readOnly
              onChange={(e) => setKids && setKids(parseInt(e.target.value))} />
            <button className={styles.button} onClick={() => incrementValue(setKids)}>+</button>
          </div>
        </div>

        <div className={styles.roomItem}>
          <p>Младенцы до 4 лет</p>
          <div className={cn(styles.inputСontainer, styles.inputСontainerKid)}>
            <button
              className={styles.button}
              onClick={() => decrementValue(setBabies)}>-</button>
            <input
              className={styles.input}
              type="number"
              min="0"
              max="1"
              value={babies}
              readOnly
              onChange={(e) => setBabies && setBabies(parseInt(e.target.value))} />
            <button
              className={styles.button}
              onClick={() => incrementValue(setBabies)}>+</button>
          </div>
        </div>


      </div>

    </section>

  );
};

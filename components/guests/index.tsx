import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styles from "./style.module.css";
import cn from "classnames";

interface GuestsProps {
  setDescriptionTitle: (description: string) => void;
}

interface GuestsCounterProps {
  adults12Years: number,
  kids11Years: number,
  babies4Years: number
}

export const Guests = ({ setDescriptionTitle }: GuestsProps): JSX.Element => {
  const [adults12Years, setAdults12Years] = useState(2);
  const [kids11Years, setKids11Years] = useState(1);
  const [babies4Years, setBabies4Years] = useState(0);

  function guestsCounter({ adults12Years, kids11Years, babies4Years }: GuestsCounterProps) {
    const adults = adults12Years;
    const kids = kids11Years + babies4Years;
    const allGuests = adults + kids;

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

    return `${allGuests}  ${stringFormatter(allGuests)}: ${adults} - взрослых, ${kids} - детей.`
  }

  useEffect(() => {
    setDescriptionTitle(guestsCounter({ adults12Years, kids11Years, babies4Years }))
  }, [adults12Years, kids11Years, babies4Years, setDescriptionTitle])



  function decrementValue(setValue: Dispatch<SetStateAction<number>>): void {
    setValue(prevValue => prevValue >= 1 ? prevValue - 1 : 0);
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
              min="0"
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
              min="0"
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
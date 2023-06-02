'use client'
import { useState, useContext } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { BookingSteps } from "../bookingSteps";
import { BookingContext } from "../../context/booking.context";


export const BookingForm = (): JSX.Element => {
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const { date, guestsString, campus } = useContext(BookingContext)

  return (
    <>

      {showSteps && <BookingSteps />}

      <section className={styles.wrapper} >
        <div className={styles.campus}>
          <p className={styles.subtitle}>Выберите</p>

          <div className={styles.titleWrapper} onClick={() => setShowSteps(!showSteps)}>
            <div className={styles.title}>{campus}</div>
            <Image
              width={12}
              height={12}
              className={styles.arrow}
              src={"/icons/arrow.svg"}
              alt=">"
            />
          </div>
        </div>

        <div className={styles.dates}>
          <p className={styles.subtitle}>Выберите даты</p>

          <div className={styles.titleWrapper} onClick={() => setShowSteps(!showSteps)}>
            <div className={styles.title}>{date}</div>
            <Image
              width={12}
              height={12}
              className={styles.arrow}
              src={"/icons/arrow.svg"}
              alt=">"
            />
          </div>
        </div>

        <div className={styles.guests} onClick={() => setShowSteps(!showSteps)}>
          <p className={styles.subtitle}>Гости</p>

          <div className={styles.titleWrapper}>
            <div className={styles.title}>{guestsString}</div>
            <Image
              width={12}
              height={12}
              className={styles.arrow}
              src={"/icons/arrow.svg"}
              alt=">"
            />
          </div>
        </div>

        <button className={styles.button} onClick={() => setShowSteps(!showSteps)}>Забронировать</button>
      </section>
    </>
  );
};
"use client";
import { useState } from "react";

import Image from "next/image";
import styles from "./style.module.css";
import arrowIcon from "./arrow.svg";
import { Calendar } from "../calendar";

export const BookingForm = (): JSX.Element => {

  const [campus, setCampus] = useState<string>("Корпус")
  const [guestsInput, setGuestsInput] = useState<number>(2)

  return (
    <>
      <section className={styles.wrapper}>

        <details className={styles.campus}>
          <summary className={styles.titleWrapper}>
            <p className={styles.subtitle}>{campus === "Корпус" ? "Выберите" : "Корпус"}</p>
            <div className={styles.title}>{campus}</div>
          </summary>

          <div className={styles.selectCampusWrapper}>
            <p className={styles.selectCampusItem} onClick={() => setCampus("Модерн 5*")}>Модерн 5*</p>
            <p className={styles.selectCampusItem} onClick={() => setCampus("Классик 4*")}>Классик 4*</p>
          </div>
        </details>

        <details className={styles.dates}>
          <summary className={styles.titleWrapper}>
            <p className={styles.subtitle}>Выберите даты</p>
            <div>
              <div className={styles.title}>20.03.2023</div>
            </div>
          </summary>
          <Calendar />
        </details>

        <details className={styles.guests}>


          <summary className={styles.titleWrapper}>
            <p className={styles.subtitle}>Гости</p>
            <input className={styles.title} type="number" value={guestsInput} onChange={(e) => setGuestsInput(e.target.valueAsNumber)} defaultValue={2} />
          </summary>
        </details>

        <button className={styles.button}>Забронировать</button>
      </section>
    </>
  );
};

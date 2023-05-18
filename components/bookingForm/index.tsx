import Image from "next/image";
import styles from "./style.module.css";
import arrowIcon from "./arrow.svg";

export const BookingForm = (): JSX.Element => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.campus}>
        <p className={styles.subtitle}>Выберите</p>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>Корпус</div>
          <Image
            width={12}
            height={12}
            className={styles.arrow}
            src={arrowIcon}
            alt=">"
          />
        </div>
      </div>

      <div className={styles.dates}>
        <p className={styles.subtitle}>Выберите даты</p>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>20.03.2023</div>
          <Image
            width={12}
            height={12}
            className={styles.arrow}
            src={arrowIcon}
            alt=">"
          />
        </div>
      </div>

      <div className={styles.guests}>
        <p className={styles.subtitle}>Гости</p>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>2 гостя</div>
          <Image
            width={12}
            height={12}
            className={styles.arrow}
            src={arrowIcon}
            alt=">"
          />
        </div>
      </div>

      <button className={styles.button}>Забронировать</button>
    </section>
  );
};

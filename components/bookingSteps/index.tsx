import Image from "next/image";
import styles from "./style.module.css";
import prevArrow from "./prevArrow.svg";
import nextArrow from "./nextArrow.svg";

const Card = ({ image = '', title = 'Название корпуса', description = '' }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImage} />
      <p className={styles.cardTitle}>{title}</p>
    </div>
  )
}

const Steps = ({ step = 1 }) => {
  return (
    <div className={styles.stepsWrapper}>
      <div className={styles.stepLine}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>

      <h2 className={styles.stepTitle}><span>Шаг {step}</span> из 5 | Выберите корпус отеля</h2>

    </div>
  )
}

export const BookingSteps = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Steps step={1} />

      <div className={styles.campuses}>
        <Card title={"Корпус Classic 4*"} />
        <Card title={"Корпус Modern 4*"} />
      </div>

      <div className={styles.buttonsWrapper}>
        <button>Вперед</button>
        <button>Назад</button>
      </div>
    </div>
  );
};

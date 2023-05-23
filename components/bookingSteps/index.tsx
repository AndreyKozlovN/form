import Image from "next/image";
import { useState } from "react";

import styles from "./style.module.css";
import cn from "classnames";


const Card = ({ image = '', title = 'Название корпуса' }) => {

  return (
    <div className={styles.cardWrapper}>
      <Image src={image} alt={"фото корпуса"} width={320} height={250} className={styles.campusImage} />
      <p className={styles.cardTitle}>{title}</p>
    </div>
  )
}

const Steps = ({ step = 1 }) => {
  return (
    <div className={styles.stepsWrapper}>
      <div className={styles.stepLine}>
        <span className={cn(styles.active, {
          [styles.currentStep]: step == 1
        })}>1</span>

        <span className={cn({
          [styles.currentStep]: step == 2
        })}> 2</span>

        <span className={cn({
          [styles.currentStep]: step == 3
        })}>3</span>

        <span className={cn({
          [styles.currentStep]: step == 4
        })}>4</span>

        <span className={cn({
          [styles.currentStep]: step == 5
        })}>5</span>
      </div>

      <h2 className={styles.stepTitle}><span>Шаг {step}</span> из 5 | Выберите корпус отеля</h2>

    </div>
  )
}

export const BookingSteps = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Steps step={1} />

      <div className={styles.content}>
        <div className={styles.campuses}>
          <Card image={"/images/modern.png "} title={"Корпус Modern 4*"} />
          <Card image={"/images/classic.png "} title={"Корпус Classic 4*"} />
        </div>

        <div className={styles.footer}>

          <div className={styles.descriptionWrapper}>
            <h3 className={styles.descriptionTitle}>Корпус “Модерн” 5* - 146 номеров в современном дизайне </h3>
            <p className={styles.descriptionText}>Дизайн интерьера выдержан в стиле Модерн и выполнен в концепции Natural Cool и Ocean Style. Современная эксклюзивная дизайнерская мебель в натуральных тонах создает лучшие условия для комфорта и уюта.</p>
          </div>

          <div className={styles.buttonsWrapper}>
            <button className={cn(styles.button, styles.buttonPrev)}><Image src={"/icons/buttonArrowPrev.svg"} alt={"<"} width={20} height={20} /></button>
            <button className={cn(styles.button, styles.buttonNext)}>Далее <Image src={"/icons/buttonArrowNext.svg"} alt={'>'} width={50}
              height={20} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

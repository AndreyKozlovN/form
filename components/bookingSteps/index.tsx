import Image from "next/image";
import { useState } from "react";

import styles from "./style.module.css";
import cn from "classnames";

interface CardProps {
  image: string;
  name: string;
  campusKey: number;
  activeCard?: boolean;
  setCampusKey: (campusKey: number) => void;
}


const Card = ({ image = '', name = 'Название корпуса', campusKey = 0, setCampusKey, activeCard }: CardProps) => {

  return (
    <div
      className={cn(styles.cardWrapper, {
        [styles.activeCard]: activeCard
      })}
      onClick={() => setCampusKey(campusKey)}>
      <Image src={image} alt={"фото корпуса"} fill className={styles.campusImage} />
      <p className={styles.cardTitle}>{name}</p>
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
          [styles.currentStep]: step >= 2
        })}> 2</span>

        <span className={cn({
          [styles.currentStep]: step >= 3
        })}>3</span>

        <span className={cn({
          [styles.currentStep]: step >= 4
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

  const campusesArray = [
    {
      image: "/images/modern.png",
      name: "Корпус Modern 4*",
      title: "Корпус “Модерн” 5* - 146 номеров в современном дизайне ",
      description: "Дизайн интерьера выдержан в стиле Модерн и выполнен в концепции Natural Cool и Ocean Style. Современная эксклюзивная дизайнерская мебель в натуральных тонах создает лучшие условия для комфорта и уюта.",
      id: '1as21ssda',
    },
    {
      image: "/images/classic.png",
      name: "Корпус Classic 4*",
      title: "Корпус “Классик” 4* - 63 номера в классическом стиле",
      description: "Исторический корпус Классик был полностью реновирован в 2016 году. Свою историю начал вести в 1913 году и имеет особую атмосферу. Дизайн номеров выполнен в эксклюзивном, классическом стиле.",
      id: '2s0sa8432j',
    }
  ]

  const [step, setStep] = useState<number>(1);
  const [campusKey, setCampusKey] = useState<number>(-1);

  return (
    <div className={styles.wrapper}>
      <Steps step={step} />

      <div className={styles.content}>
        <div className={styles.campuses}>
          {
            campusesArray.map((campus, index) => (
              <Card
                key={campus.id}
                image={campus.image}
                name={campus.name}
                campusKey={index}
                setCampusKey={setCampusKey}
                activeCard={index === campusKey ? true : false} />
            ))
          }
        </div>

        <div className={styles.footer}>

          <div className={styles.descriptionWrapper}>
            {
              campusKey >= 0 &&
              <>
                <h3 className={styles.descriptionTitle}>{campusesArray[campusKey].title}</h3>
                <p className={styles.descriptionText}>{campusesArray[campusKey].description}</p>
              </>
            }
          </div>

          <div className={styles.buttonsWrapper}>
            <button onClick={() => setStep(step > 1 ? step - 1 : step)} className={cn(styles.button, styles.buttonPrev)}>
              <Image src={"/icons/buttonArrowPrev.svg"} alt={"<"} width={20} height={20} />
            </button>
            <button onClick={() => setStep(step < 5 ? step + 1 : step)} className={cn(styles.button, styles.buttonNext)}>Далее <Image src={"/icons/buttonArrowNext.svg"} alt={'>'} width={50}
              height={20} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

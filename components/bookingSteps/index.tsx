import Image from "next/image";
import { useContext, useState } from "react";
import styles from "./style.module.css";
import cn from "classnames";
import { BookingContext } from "../../context/booking.context";
import { Steps } from "../steps";
import { SelectComponent } from "../selectComponent";

export const BookingSteps = (): JSX.Element => {

  const {
    descriptionText = '',
    setDescriptionText,
    descriptionTitle = '',
    setDescriptionTitle
  } = useContext(BookingContext)

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
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const [step, setStep] = useState<number>(1);

  return (
    <div className={styles.wrapper}>
      <Steps step={step} />

      <div className={styles.content}>
        <div className={styles.stepContent}>

          <SelectComponent
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            step={step}
            campusesArray={campusesArray} />

        </div>

        <div className={styles.footer}>

          <div className={styles.descriptionWrapper}>
            <h3 className={styles.descriptionTitle}>{descriptionTitle}</h3>
            <p className={styles.descriptionText}>{descriptionText}</p>
          </div>

          <div className={styles.buttonsWrapper}>
            <button onClick={() => {
              setStep(step > 1 ? step - 1 : step)
              setDescriptionTitle && setDescriptionTitle(step <= 5 && step >= 2 ? " " : descriptionTitle)
              setDescriptionText && setDescriptionText(step <= 5 && step >= 2 ? " " : descriptionText)
              setActiveCardIndex(step <= 5 && step >= 2 ? -1 : activeCardIndex)
            }}
              className={cn(styles.button, styles.buttonPrev)}>
              <Image
                src={"/icons/buttonArrowPrev.svg"}
                alt={"<"}
                width={20}
                height={20} />
            </button>

            <button onClick={() => {
              setStep(step < 5 ? step + 1 : step)
              setDescriptionTitle && setDescriptionTitle(step < 5 && step >= 1 ? " " : descriptionTitle)
              setDescriptionText && setDescriptionText(step < 5 && step >= 1 ? " " : descriptionText)
              setActiveCardIndex(step < 5 && step >= 1 ? -1 : activeCardIndex)
            }}
              className={cn(styles.button, styles.buttonNext)}>
              Далее
              <Image
                src={"/icons/buttonArrowNext.svg"}
                alt={'>'}
                width={50}
                height={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import cn from "classnames";
import { BookingContext } from "../../context/booking.context";
import { Steps } from "../steps";
import { SelectComponent } from "../selectComponent";

export const BookingSteps = (): JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const {
    descriptionText = '',
    setDescriptionText,
    descriptionTitle = '',
    setDescriptionTitle,
    setShowSteps,
    showSteps,
    campusTitle = "Выберите корпус",
    campusDescription = " ",
  } = useContext(BookingContext)

  useEffect(() => {
    if (step == 1) {
      setDescriptionTitle && setDescriptionTitle(campusTitle)
      setDescriptionText && setDescriptionText(campusDescription)
    }
  }, [campusDescription, campusTitle, setDescriptionText, setDescriptionTitle, step])

  const campusesArray = [
    {
      image: "/images/modern.png",
      name: "Корпус Modern 5*",
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

  const conditionOnFirstStep = step == 1 && !descriptionText && !descriptionTitle;
  const conditionToNextStep = () => {
    if (conditionOnFirstStep) {
      return step
    } else if (step < 5) {
      return step + 1
    } else {
      return step
    }
  }

  return (
    <>
      <div className={styles.exit} onClick={() => setShowSteps && setShowSteps(!showSteps)}>
        <Image
          width={45}
          height={45}
          className={styles.arrow}
          src={"/icons/exit.svg"}
          alt="Exit" />
      </div>

      <div className={styles.wrapper}>

        <Steps step={step} />

        <div className={styles.content}>
          <div className={styles.stepContent}>
            <SelectComponent
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
              }}
                className={cn(styles.button, styles.buttonPrev, {
                  [styles.buttonFirstStepPrev]: step == 1
                })}>
                <Image
                  src={"/icons/buttonArrowPrev.svg"}
                  alt={"<"}
                  width={20}
                  height={20} />
              </button>

              <button onClick={() => {
                setStep(conditionToNextStep())
              }}
                className={cn(styles.button, styles.buttonNext, {
                  [styles.buttonFirstStepNext]: conditionOnFirstStep
                })}>
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
      </div></>
  );
};

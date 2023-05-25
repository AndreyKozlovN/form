import Image from "next/image";
import { useState } from "react";

import styles from "./style.module.css";
import cn from "classnames";
import { Calendar } from "../calendar";

interface Campus {
  image: string;
  name: string;
  title: string;
  description: string;
  id: string;
}

interface CardProps {
  image: string;
  name: string;
  title: string;
  description: string;
  setDescriptionTitle: (description: string) => void;
  setDescriptionText: (text: string) => void;
  index?: number;
  activeCardIndex: number;
  setActiveCardIndex: (index: any) => void;
}

interface SelectComponent {
  step: number;
  campusesArray: Campus[];
  setDescriptionTitle: (description: string) => void;
  setDescriptionText: (text: string) => void;
  activeCardIndex: any;
  setActiveCardIndex: (index: any) => void;
}


const Card = (
  { image = '',
    name = 'Название корпуса',
    title,
    description,
    setDescriptionTitle,
    setDescriptionText,
    index,
    activeCardIndex,
    setActiveCardIndex }: CardProps) => {

  return (
    <div
      className={cn(styles.cardWrapper, {
        [styles.activeCard]: index == activeCardIndex
      })}
      onClick={() => {
        setDescriptionTitle(title)
        setDescriptionText(description)
        setActiveCardIndex(index)
      }}>
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

const SelectComponent = (
  { step = 1,
    campusesArray,
    setDescriptionText,
    setDescriptionTitle,
    activeCardIndex,
    setActiveCardIndex }: SelectComponent): JSX.Element => {

  switch (step) {
    case 1: return <>{campusesArray && campusesArray.map((campus: any, index: number) => (
      <Card
        index={index}
        key={campus.id}
        image={campus.image}
        name={campus.name}
        title={campus.title}
        description={campus.description}
        setDescriptionText={setDescriptionText}
        setDescriptionTitle={setDescriptionTitle}
        activeCardIndex={activeCardIndex}
        setActiveCardIndex={setActiveCardIndex} />
    ))}</>
    case 2: return <Calendar />
    default: return <></>
  }
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
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const [step, setStep] = useState<number>(1);
  const [descriptionTitle, setDescriptionTitle] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string>('');

  return (
    <div className={styles.wrapper}>
      <Steps step={step} />

      <div className={styles.content}>
        <div className={styles.stepContent}>

          <SelectComponent
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            setDescriptionTitle={setDescriptionTitle}
            setDescriptionText={setDescriptionText}
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
              setDescriptionTitle(step <= 5 && step >= 2 ? " " : descriptionTitle)
              setDescriptionText(step <= 5 && step >= 2 ? " " : descriptionText)
              setActiveCardIndex(step <= 5 && step >= 2 ? -1 : activeCardIndex)
            }} className={cn(styles.button, styles.buttonPrev)}>
              <Image src={"/icons/buttonArrowPrev.svg"} alt={"<"} width={20} height={20} />
            </button>
            <button onClick={() => {
              setStep(step < 5 ? step + 1 : step)
              setDescriptionTitle(step < 5 && step >= 1 ? " " : descriptionTitle)
              setDescriptionText(step < 5 && step >= 1 ? " " : descriptionText)
              setActiveCardIndex(step < 5 && step >= 1 ? -1 : activeCardIndex)
            }} className={cn(styles.button, styles.buttonNext)}>Далее <Image src={"/icons/buttonArrowNext.svg"} alt={'>'} width={50}
              height={20} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

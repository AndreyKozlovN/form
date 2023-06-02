import Image from "next/image";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface MontProps {
  monthNumber?: number;
  year?: number;
}

const WeekDays = () => {
  return (
    <div className={styles.weekDayNames}>
      <div>ПН</div>
      <div>ВТ</div>
      <div>СР</div>
      <div>ЧТ</div>
      <div>ПТ</div>
      <div>СБ</div>
      <div>ВС</div>
    </div>
  )
}

export const Calendar = (): JSX.Element => {

  const now = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth() + 1) //текущий месяц по дефолту
  const [currentYear, setCurrentYear] = useState<number>(now.getFullYear()) //текущий год по дефолту

  const Month = ({ monthNumber = currentMonth, year = currentYear }: MontProps): JSX.Element => {

    const monthNames = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    const monthName = monthNames[monthNumber - 1]; // получение названия месяца по номеру
    const daysInMonth = new Date(year, monthNumber, 0).getDate(); // получение количества дней в месяце
    const monthDays = []; // массив для хранения элементов

    // генерация элементов
    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(
        <div key={i}>
          {i}
          <p className={styles.monthDaysPrice}>от 5000₽</p>
        </div>
      );
    }

    return (
      <>
        <h3 className={styles.monthTitle}>{monthName} {year}</h3>
        <WeekDays />
        <div className={styles.monthDays}>
          {monthDays}
        </div>
      </>
    ); // возвращение списка элементов и названия месяца
  }


  return (
    <div className={styles.wrapper}>
      <Image
        onClick={() => setCurrentMonth(currentMonth - 1)}
        className={styles.prevArrow}
        width={12}
        height={22}
        src={"/icons/prevArrow.svg"}
        alt={"Назад"}
      />

      <div className={styles.firstMonth}>
        <Month monthNumber={currentMonth} year={currentYear} />
      </div>

      <div className={styles.secondMonth}>
        <Month monthNumber={currentMonth + 1} year={currentYear} />
      </div>

      <div className={styles.description}>
        <p className={styles.descriptionTitle}>
          {/* Заезд 10 апреля - Выезд 14 апреля. Итого 4 ночи. */}
        </p>
        <p className={styles.descriptionSubtitle}>
          {/* Лучшие цены для 1 гостя за ночь. Цена может быть доступна при
          соблюдении специальных условий бронирования. */}
        </p>
      </div>

      <Image
        onClick={() => setCurrentMonth(currentMonth + 1)}
        className={styles.nextArrow}
        width={12}
        height={22}
        src={"/icons/nextArrow.svg"}
        alt={"Вперёд"}
      />
    </div>
  );
};

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

  const [periodFrom, setPeriodFrom] = useState<string>(generateCurrentMonthDate("first"));
  const [periodTo, setPeriodTo] = useState<string>(generateCurrentMonthDate("last"));
  const [calendarData, setCalendarData] = useState({});
  console.log(calendarData)

  function generateCurrentMonthDate(type: "first" | "last"): string { // функция для конвертации дат в формат ISO для API запроса
    let day: number;

    if (type === "first") {
      day = 1;
    } else {
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 1);
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
      day = lastDayOfMonth.getDate();
    }

    const date = new Date(currentYear, currentMonth, day);

    function convert(str: any) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    return convert(date);
  }

  useEffect(() => {
    async function fetchCalendarData(from: string, to: string) {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://backend.upro.group/api/v1/uprodev/001/available-rooms/calendar?periodFrom=${from}&periodTo=${to}`,
          // для избежания CORS Ошибок - добавляем префикс https://cors-anywhere.herokuapp.com к URL
        );
        setCalendarData(response.data);
      } catch (error) {
        console.error(`Ошибка = ${error}`);
      }
    }

    fetchCalendarData(periodFrom, periodTo);
  }, []);

  const handleMonthChange = (newMonth: number) => {
    // проверка на допустимые значения
    if (newMonth > 12) { // текущий месяц декабрь - переходим на следующий год
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else if (newMonth < 1) { // текущий месяц январь - переходим на предыдущий год
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(newMonth);
    }
  }

  const Month = ({ monthNumber = currentMonth, year = currentYear }: MontProps): JSX.Element => {
    if (monthNumber > 12) {
      monthNumber = 1;
      year += 1;
    }
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

    // генерация дней с ценой
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
        onClick={() => handleMonthChange(currentMonth - 1)}
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
        onClick={() => handleMonthChange(currentMonth + 1)}
        className={styles.nextArrow}
        width={12}
        height={22}
        src={"/icons/nextArrow.svg"}
        alt={"Вперёд"}
      />
    </div>
  );
};

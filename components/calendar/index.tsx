import Image from "next/image";
import styles from "./style.module.css";
import { WeekDays } from "./weekDays";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookingContext } from "../../context/booking.context";

const fake = {
  "items": {
    "2023-06-01": 6700,
    "2023-06-02": 6700,
    "2023-06-03": 6700,
    "2023-06-04": 7900,
    "2023-06-05": 7100,
    "2023-06-06": 7100,
    "2023-06-07": 7100,
    "2023-06-08": 6900,
    "2023-06-09": 6500,
    "2023-06-10": 6500,
    "2023-06-11": 6700,
    "2023-06-12": 6900,
    "2023-06-13": 7100,
    "2023-06-14": 7100,
    "2023-06-15": 6700,
    "2023-06-16": 7100,
    "2023-06-17": 6900,
    "2023-06-18": 6900,
    "2023-06-19": 6900,
    "2023-06-20": 6900,
    "2023-06-21": 6900,
    "2023-06-22": 6700,
    "2023-06-23": 6900,
    "2023-06-24": 6900,
    "2023-06-25": 6700,
    "2023-06-26": 6700,
    "2023-06-27": 6700,
    "2023-06-28": 6700,
    "2023-06-29": 6500,
    "2023-06-30": 6500
  }
}

function getNextMonthDates(start: string, end: string): [string, string] {
  //Функци по преобразованию даты в дату следующего месяца для запроса

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Проверяем, что конечная дата больше начальной
  if (startDate > endDate) {
    throw new Error(`End date must be greater than start date`);
  }

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;

  let nextMonthYear = startYear;
  let nextMonthMonth = startMonth + 1;

  // Если следующий месяц это январь следующего года
  if (nextMonthMonth > 12) {
    nextMonthYear++;
    nextMonthMonth = 1;
  }

  let daysInNextMonth = new Date(nextMonthYear, nextMonthMonth, 0).getDate();

  // Если конечная дата находится в следующем месяце, устанавливаем количество дней в следующем месяце до конечного дня
  if (startYear !== endYear || startMonth !== endMonth) {
    daysInNextMonth = endDate.getDate();
  }

  const nextMonthStartDate = `${nextMonthYear}-${nextMonthMonth.toString().padStart(2, '0')}-01`;
  const nextMonthEndDate = `${nextMonthYear}-${nextMonthMonth.toString().padStart(2, '0')}-${daysInNextMonth.toString().padStart(2, '0')}`;

  return [nextMonthStartDate, nextMonthEndDate];
}

export const Calendar = (): JSX.Element => {

  const now = new Date();
  const { setDescriptionTitle, setDescriptionText } = useContext(BookingContext)
  const [currentMonth, setCurrentMonth] = useState<number>(now.getMonth() + 1) //текущий месяц по дефолту
  const [currentYear, setCurrentYear] = useState<number>(now.getFullYear()) //текущий год по дефолту

  const [periodFrom, setPeriodFrom] = useState<string>(generateCurrentMonthDate("first"));
  const [periodTo, setPeriodTo] = useState<string>(generateCurrentMonthDate("last"));

  const [calendarData, setCalendarData] = useState<CalendarDataProps>(fake);
  const [calendarDataNextMonth, setCalendarDataNextMonth] = useState<CalendarDataProps>(fake);

  function generateCurrentMonthDate(type: "first" | "last"): string {
    // функция для конвертации дат в формат ISO для API запроса
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

  function changePeriod() {
    setPeriodFrom(generateCurrentMonthDate("first"));
    setPeriodTo(generateCurrentMonthDate("last"));
  }

  useEffect(() => {
    setDescriptionTitle && setDescriptionTitle(`Заезд ${''} - Выезд ${''}. Итого ${''}.`)
    setDescriptionText && setDescriptionText('Лучшие цены для 1 гостя за ночь. Цена может быть доступна при соблюдении специальных условий бронирования')
  })

  useEffect(() => {
    async function fetchCalendarData(from: string, to: string) {
      try {
        // для избежания CORS Ошибок - добавляем префикс https://cors-anywhere.herokuapp.com к URL
        const response = await axios.get(
          `https://backend.upro.group/api/v1/uprodev/001/available-rooms/calendar?periodFrom=${from}&periodTo=${to}`,
        );
        const responseNextMonth = await axios.get(
          `https://backend.upro.group/api/v1/uprodev/001/available-rooms/calendar?periodFrom=${getNextMonthDates(from, to)[0]}&periodTo=${getNextMonthDates(from, to)[1]}`,
        );
        setCalendarData(response.data);
        setCalendarDataNextMonth(responseNextMonth.data)
      } catch (error) {
        console.error(`Ошибка = ${error}`);
      }
    }

    fetchCalendarData(periodFrom, periodTo);
  }, [currentMonth, periodFrom, periodTo]);

  const handleMonthChange = (newMonth: number) => {
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

  const Month = ({ monthNumber = currentMonth, year = currentYear, nextMonth = false }: MontProps): JSX.Element => {
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
    const monthDays = [];

    const data = nextMonth ? calendarDataNextMonth : calendarData;
    for (let dayNumber = 1; dayNumber <= Object.keys(data.items).length; dayNumber++) {
      monthDays.push(
        <div key={dayNumber}>
          {dayNumber}
          <p className={styles.monthDaysPrice}>
            от {data.items[Object.keys(data.items)[dayNumber - 1]]} ₽
          </p>
        </div>
      );
    }

    return (
      <>
        <h3 className={styles.monthTitle}>{monthName} {year}</h3>
        <WeekDays />
        {
          monthDays.length > 1 ? (
            <div className={styles.monthDays}>
              {monthDays}
            </div>
          ) : (
            <span className={styles.spinner}><Image src="/icons/spinner.svg" alt="Loading..." width={64} height={64} /></span >
          )
        }
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Image
        onClick={() => { handleMonthChange(currentMonth - 1); changePeriod() }}
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
        <Month monthNumber={currentMonth + 1} year={currentYear} nextMonth />
      </div>

      <Image
        onClick={() => { handleMonthChange(currentMonth + 1); changePeriod() }}
        className={styles.nextArrow}
        width={12}
        height={22}
        src={"/icons/nextArrow.svg"}
        alt={"Вперёд"}
      />
    </div>
  );
};

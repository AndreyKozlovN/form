import { FC, useContext, useEffect, useMemo, useState } from "react";
import { checkDateIsEqual, checkIsToday } from "./helpers";
import { useCalendar } from "./hooks/useCalendar";

import s from "./Calendar.module.css";
import { CalendarProps } from "./Calendar.interface";
import Image from "next/image";
import axios from "axios";
import { BookingContext } from "../../context/booking.context";
import { useCalendarNextMonth } from "./hooks/useCalendarNextMonth";

export const Calendar: FC<CalendarProps> = ({
    locale = "default",
    selectedDate: date,
    selectDate,
    firstWeekDayNumber = 2,
}) => {

    // Создаем объект, представляющий текущую дату
    const currentDate = new Date();
    // Получаем текущий месяц
    const currentMonth = currentDate.getMonth();
    // Устанавливаем месяц следующего месяца
    currentDate.setMonth(currentMonth + 1);
    // Получаем новый объект, представляющий следующий месяц
    const nextMonthDate = currentDate;

    const { setDescriptionTitle, setDescriptionText } = useContext(BookingContext)

    const { functions, state } = useCalendar({
        locale,
        selectedDate: date,
        firstWeekDayNumber,
    });

    const { functionsNextMonth, stateNextMonth } = useCalendarNextMonth({
        locale,
        selectedDate: nextMonthDate,
        firstWeekDayNumber,
    });

    useEffect(() => {
        setDescriptionTitle && setDescriptionTitle(`Заезд ${''} - Выезд ${''}. Итого ${''}.`)
        setDescriptionText && setDescriptionText('Лучшие цены для 1 гостя за ночь. Цена может быть доступна при соблюдении специальных условий бронирования')
    })

    const selectPeriod = (day: any) => {
        if (!day) return;
        const { year, monthNumber, dayNumber } = day
        return `${year}-${monthNumber < 10 ? '0' + monthNumber : monthNumber}-${dayNumber}`
    }

    const periodFrom = useMemo(() => selectPeriod(state.calendarDays[0]), [state.calendarDays])
    const periodTo = useMemo(() => selectPeriod(stateNextMonth.calendarDays[stateNextMonth.calendarDays.length - 1]), [stateNextMonth.calendarDays])

    const [currentDaysData, setCurrentDaysData] = useState(null);

    useEffect(() => {
        async function fetchCalendarData(from: string, to: string) {
            try {
                const response = await axios.get(
                    `https://backend.upro.group/api/v1/uprodev/001/available-rooms/calendar?periodFrom=${from}&periodTo=${to}`,
                );
                setCurrentDaysData(response.data.items)
            } catch (error) {

                console.error(`Ошибка = ${error}`);
            }
        }
        if (periodFrom && periodTo) {
            fetchCalendarData(periodFrom, periodTo);
        }
    }, [periodFrom, periodTo]);

    return (
        <div className={s.wrapper}>
            <Image
                aria-hidden
                onClick={(): void => { functions.onClickArrow("left"); functionsNextMonth.onClickArrow("left") }}
                className={s.prevArrow}
                width={12}
                height={22}
                src={"/icons/prevArrow.svg"}
                alt={"Назад"}
            />
            <div className={s.calendar}>
                <div className={s.calendarHeader}>
                    {state.mode === "days" && (
                        <div aria-hidden >
                            {
                                state.monthesNames[
                                    state.selectedMonth.monthIndex
                                ].month
                            }{" "}
                            {state.selectedYear}
                        </div>
                    )}
                </div>

                <div className={s.calendarBody}>
                    {state.mode === "days" && (
                        <>
                            <div className={s.calendarWeekNames}>
                                {state.weekDaysNames.map(
                                    (weekDaysName: any, index: number) => (
                                        <div
                                            key={
                                                weekDaysName.dayShort +
                                                index.toString()
                                            }
                                        >
                                            {weekDaysName.dayShort}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className={s.calendarDays}>
                                {state.calendarDays.map((day, index) => {
                                    const { year, monthNumber, dayNumber } = day
                                    const validation = (num: number) => num < 10 ? '0' + num : num;
                                    const currentDay = `${year}-${validation(monthNumber)}-${validation(dayNumber)}`

                                    const isToday = checkIsToday(day.date);
                                    const isSelectedDay = checkDateIsEqual(
                                        day.date,
                                        state.selectedDay.date
                                    );
                                    const isAdditionalDay =
                                        day.monthIndex !==
                                        state.selectedMonth.monthIndex;

                                    return (
                                        <div
                                            key={
                                                day.dayNumber +
                                                day.monthIndex +
                                                index.toString()
                                            }
                                            aria-hidden
                                            onClick={(): void => {
                                                functions.setSelectedDay(
                                                    day
                                                );
                                                selectDate(day.date);
                                            }}
                                            className={[
                                                s.calendarDay,
                                                isToday
                                                    ? s.calendarTodayItem
                                                    : "",
                                                isSelectedDay
                                                    ? s.calendarSelectedItem
                                                    : "",
                                                isAdditionalDay
                                                    ? s.calendarAdditionalDay
                                                    : "",
                                            ].join(" ")}
                                        >
                                            {day.dayNumber}
                                            <span>
                                                {
                                                    currentDaysData
                                                        ? <>
                                                            {
                                                                currentDaysData[currentDay]
                                                                    ? <>от {currentDaysData[currentDay]} ₽</>
                                                                    : <Image
                                                                        src="/icons/spinner.svg"
                                                                        alt="Loading..."
                                                                        width={12}
                                                                        height={12}
                                                                    />
                                                            }
                                                        </>
                                                        : <Image
                                                            src="/icons/spinner.svg"
                                                            alt="Loading..."
                                                            width={12}
                                                            height={12}
                                                        />
                                                }
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className={s.calendar}>
                <div className={s.calendarHeader}>
                    {stateNextMonth.mode === "days" && (
                        <div aria-hidden >
                            {
                                stateNextMonth.monthesNames[
                                    stateNextMonth.selectedMonth.monthIndex
                                ].month
                            }{" "}
                            {stateNextMonth.selectedYear}
                        </div>
                    )}

                </div>

                <div className={s.calendarBody}>
                    {stateNextMonth.mode === "days" && (
                        <>
                            <div className={s.calendarWeekNames}>
                                {state.weekDaysNames.map(
                                    (weekDaysName: any, index: number) => (
                                        <div
                                            key={
                                                weekDaysName.dayShort +
                                                index.toString()
                                            }
                                        >
                                            {weekDaysName.dayShort}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className={s.calendarDays}>
                                {stateNextMonth.calendarDays.map((day, index) => {
                                    const { year, monthNumber, dayNumber } = day
                                    const validation = (num: number) => num < 10 ? '0' + num : num;
                                    const currentDay = `${year}-${validation(monthNumber)}-${validation(dayNumber)}`

                                    const isToday = checkIsToday(day.date);
                                    const isAdditionalDay =
                                        day.monthIndex !==
                                        stateNextMonth.selectedMonth.monthIndex;
                                    return (
                                        <div
                                            key={
                                                day.dayNumber +
                                                day.monthIndex +
                                                index.toString()
                                            }
                                            aria-hidden
                                            onClick={(): void => {
                                                functions.setSelectedDay(
                                                    day
                                                );
                                                selectDate(day.date);
                                            }}
                                            className={[
                                                s.calendarDay,
                                                isToday
                                                    ? s.calendarTodayItem
                                                    : "",
                                                isAdditionalDay
                                                    ? s.calendarAdditionalDay
                                                    : "",
                                            ].join(" ")}
                                        >
                                            {day.dayNumber}
                                            <span>
                                                {
                                                    currentDaysData
                                                        ? <>
                                                            {
                                                                currentDaysData[currentDay]
                                                                    ? <>от {currentDaysData[currentDay]} ₽</>
                                                                    : <Image
                                                                        src="/icons/spinner.svg"
                                                                        alt="Loading..."
                                                                        width={12}
                                                                        height={12}
                                                                    />
                                                            }
                                                        </>
                                                        : <Image
                                                            src="/icons/spinner.svg"
                                                            alt="Loading..."
                                                            width={12}
                                                            height={12}
                                                        />
                                                }
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Image
                aria-hidden
                onClick={(): void => { functions.onClickArrow("right"); functionsNextMonth.onClickArrow("right") }}
                className={s.nextArrow}
                width={12}
                height={22}
                src={"/icons/nextArrow.svg"}
                alt={"Вперед"}
            />

        </div>
    );
};

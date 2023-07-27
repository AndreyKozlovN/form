"use client"
import { useContext, useEffect, useState } from "react"
import { BookingContext } from "../../context/booking.context";
import "./style.css"
import axios from "axios";
import Image from "next/image";
import { Calendar } from "../newCalendar/Calendar";
import { Guests } from "../guests";

export default function Booking() {

	const {
		adults,
		kids,
		babies,
		arrivalDate,
		departureDate,
	} = useContext(BookingContext)


	const [bookingData, setBookingData] = useState(null);

	useEffect(() => {
		async function fetchCalendarData() {
			try {
				const response = await axios.get(
					// @ts-ignore
					`https://backend.upro.group/api/v1/uprodev/001/available-rooms/types?adults=${adults}&kids=${kids + babies}&kidsAge=string&periodFrom=${arrivalDate}&periodTo=${departureDate}`,
				);
				setBookingData(response.data.items)
			} catch (error) {
				console.error(`Ошибка = ${error}`);
			}
		}
		fetchCalendarData()
	}, [adults, arrivalDate, babies, departureDate, kids]);

	const [selectedDate, setSelectedDay] = useState(new Date());
	return (
		<>
			<div className="calendar">
				<Calendar selectedDate={selectedDate}
					selectDate={(date) => setSelectedDay(date)} />
				<div>
					<p>Дата заезда: <br /> {arrivalDate}</p>
					<p>Дата выезда: <br /> {departureDate}</p>
				</div>
				<Guests />
			</div>
			<div className="main">
				{
					bookingData
						// @ts-ignore
						? bookingData.map((item) => {
							return (
								<div key={item.roomType} className="description">
									<h2>{item.description}</h2>
									<p>Цена: {item.amountPresentation}</p>
									<p>Дата последнего бронирования: {item.lastReservationDate}</p>
									<p>{item.roomRateDescription}</p>
									{
										item.images && <div className="images">
											{item.images.map((image: string) => {
												return (
													<Image key={image} src={`https://backend.upro.group${image}`} alt="image" width={150} height={100} />
												)
											})}
										</div>
									}
								</div>
							)
						})
						: <div className="description">
							Нет данных на эти числа
						</div>
				}

			</div>

		</>
	);
}

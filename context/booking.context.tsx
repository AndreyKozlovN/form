'use client'
import { ReactNode, createContext, useState } from "react"

export interface BookingContextProps {
	campus: string;
	setCampus?: (campusName: string) => void;
	date: string;
	setDate?: (date: string) => void;
	guests: number;
	setGuests?: (guests: number) => void;
	descriptionTitle?: string;
	setDescriptionTitle?: (desriptionText: string) => void;
	descriptionText?: string;
	setDescriptionText?: (desriptionText: string) => void;
	guestsString?: string;
	setGuestsString?: (guests: string) => void;
}

export const BookingContext = createContext<BookingContextProps>(
	{ date: '', guests: 2, campus: 'Корпус' }
);

export const BookingContextProvider = (
	{
		date,
		guests,
		campus,
		children,
	}: BookingContextProps & { children: ReactNode }): JSX.Element => {

	const [campusState, setCampusState] = useState<string>(campus);
	const [dateState, setDateState] = useState<string>(date);
	const [guestsState, setGuestsState] = useState<number>(guests);
	const [guestsStringState, setGuestsStringState] = useState<string>('2 гостя')
	const [descriptionTitleState, setDescriptionTitleState] = useState<string>('');
	const [descriptionTextState, setDescriptionTextState] = useState<string>('');

	const setCampus = (campusName: string) => {
		setCampusState(campusName);
	}

	const setDate = (date: string) => {
		setDateState(date);
	}

	const setGuests = (guests: number) => {
		setGuestsState(guests);
	}

	const setGuestsString = (guests: string) => {
		setGuestsStringState(guests);
	}

	const setDescriptionTitle = (desriptionTitle: string) => {
		setDescriptionTitleState(desriptionTitle)
	}

	const setDescriptionText = (desriptionText: string) => {
		setDescriptionTextState(desriptionText)
	}

	return (
		<BookingContext.Provider
			value={{
				campus: campusState,
				setCampus,
				date: dateState,
				setDate,
				guests: guestsState,
				setGuests,
				descriptionTitle: descriptionTitleState,
				setDescriptionTitle,
				descriptionText: descriptionTextState,
				setDescriptionText,
				guestsString: guestsStringState,
				setGuestsString
			}}>
			{children}
		</BookingContext.Provider>
	)
}
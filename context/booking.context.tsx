'use client'
import { ReactNode, createContext, useState } from "react"

export interface BookingContextProps {
	campus: string;
	setCampus?: (campusName: string) => void;
	date: string;
	setDate?: (date: string) => void;
	descriptionTitle?: string;
	setDescriptionTitle?: (desriptionText: string) => void;
	descriptionText?: string;
	setDescriptionText?: (desriptionText: string) => void;
	guestsString?: string;
	setGuestsString?: (guests: string) => void;
	showSteps?: boolean;
	setShowSteps?: (show: boolean) => void;
	promocode?: string;
	setPromocode?: (promo: string) => void;
	adults?: number;
	setAdults?: (adults: number) => void;
	kids?: number;
	setKids?: (kids: number) => void;
	babies?: number;
	setBabies?: (babies: number) => void;
	guests: number;
	setGuests?: (guests: number) => void;
	campusTitle?: string;
	setCampusTitle?: (title: string) => void;
	campusDescription?: string;
	setCampusDescription?: (description: string) => void;
	activeCampusIndex?: number,
	setActiveCampusIndex?: (index: number) => void;
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
	const [guestsStringState, setGuestsStringState] = useState<string>('2 гостя')
	const [descriptionTitleState, setDescriptionTitleState] = useState<string>('');
	const [descriptionTextState, setDescriptionTextState] = useState<string>('');
	const [showStepsState, setShowStepsState] = useState<boolean>(false);
	const [promocodeState, setPromocodeState] = useState<string>('');
	const [adultsState, setAdultsState] = useState<number>(2);
	const [kidsState, setKidsState] = useState<number>(0);
	const [babiesState, setBabiesState] = useState<number>(0);
	const [guestsState, setGuestsState] = useState<number>(guests);
	const [campusTitleState, setCampusTitleState] = useState<string>('Выберите корпус');
	const [campusDescriptionState, setCampusDescriptionState] = useState<string>('');
	const [activeCampusIndexState, setActiveCampusIndexState] = useState<number>(-1);


	const setCampusTitle = (title: string) => {
		setCampusTitleState(title)
	}

	const setCampusDescription = (description: string) => {
		setCampusDescriptionState(description)
	}

	const setCampus = (campusName: string) => {
		setCampusState(campusName);
	}

	const setDate = (date: string) => {
		setDateState(date);
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

	const setShowSteps = (show: boolean) => {
		setShowStepsState(show)
	}

	const setPromocode = (promo: string) => {
		setPromocodeState(promo);
	}

	const setAdults = (adults: number) => {
		setAdultsState(adults);
	}

	const setKids = (kids: number) => {
		setKidsState(kids);
	}

	const setBabies = (babies: number) => {
		setBabiesState(babies);
	}

	const setGuests = (guests: number) => {
		setGuestsState(guests);
	}

	const setActiveCampusIndex = (index: number) => {
		setActiveCampusIndexState(index)
	}

	return (
		<BookingContext.Provider
			value={{
				campus: campusState,
				setCampus,
				date: dateState,
				setDate,
				descriptionTitle: descriptionTitleState,
				setDescriptionTitle,
				descriptionText: descriptionTextState,
				setDescriptionText,
				guestsString: guestsStringState,
				setGuestsString,
				showSteps: showStepsState,
				setShowSteps,
				promocode: promocodeState,
				setPromocode,
				adults: adultsState,
				setAdults,
				kids: kidsState,
				setKids,
				babies: babiesState,
				setBabies,
				guests: guestsState,
				setGuests,
				campusTitle: campusTitleState,
				setCampusTitle,
				campusDescription: campusDescriptionState,
				setCampusDescription,
				activeCampusIndex: activeCampusIndexState,
				setActiveCampusIndex
			}}>
			{children}
		</BookingContext.Provider>
	)
}
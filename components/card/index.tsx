import { useContext } from "react";
import Image from "next/image";
import { BookingContext } from "../../context/booking.context";
import styles from "./style.module.css";
import cn from "classnames";

interface CardProps {
	image: string;
	name: string;
	title: string;
	description: string;
	index?: number;
	activeCardIndex: number;
	setActiveCardIndex: (index: any) => void;
}

export const Card = (
	{ image = '',
		name,
		title,
		description,
		index,
		activeCardIndex,
		setActiveCardIndex }: CardProps) => {

	const { setDescriptionText, setDescriptionTitle, setCampus } = useContext(BookingContext)

	return (
		<div
			className={cn(styles.cardWrapper, {
				[styles.activeCard]: index == activeCardIndex
			})}
			onClick={() => {
				setDescriptionTitle && setDescriptionTitle(title)
				setDescriptionText && setDescriptionText(description)
				setCampus && setCampus(name)
				setActiveCardIndex(index)
			}}>
			<Image src={image} alt={"фото корпуса"} fill className={styles.campusImage} />
			<p className={styles.cardTitle}>{name}</p>
		</div>
	)
}
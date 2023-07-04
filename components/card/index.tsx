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
	index: number;
}

export const Card = (
	{ image = '',
		name,
		title,
		description,
		index, }: CardProps) => {

	const {
		setCampus,
		setCampusDescription,
		setCampusTitle,
		activeCampusIndex,
		setActiveCampusIndex } = useContext(BookingContext)

	return (
		<div
			className={cn(styles.cardWrapper, {
				[styles.activeCard]: index == activeCampusIndex
			})}
			onClick={() => {
				setCampusDescription && setCampusDescription(description)
				setCampusTitle && setCampusTitle(title)
				setCampus && setCampus(name)
				setActiveCampusIndex && setActiveCampusIndex(index)
			}}>
			<Image src={image} alt={"фото корпуса"} fill className={styles.campusImage} />
			<p className={styles.cardTitle}>{name}</p>
		</div>
	)
}
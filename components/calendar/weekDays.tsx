import styles from "./style.module.css";

export const WeekDays = () => {
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
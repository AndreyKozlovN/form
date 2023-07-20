import { useMemo } from "react"
import styles from "./style.module.css";
import cn from "classnames";

export const Steps = ({ step = 1 }) => {

	const stepText = (step: number): JSX.Element => {
		switch (step) {
			case 1: return <>Выберите корпус отеля</>
			case 2: return <>Выберите даты заезда и выезда и нажмите “Далее”</>
			case 3: return <>Укажите количество гостей</>
			case 4: return <>Укажите промокод (не обязательно)</>
			case 5: return <>Инфо по шагу 5</>
			default: return <>Выберите корпус отеля</>
		}
	}

	const memoStepText = useMemo(() => stepText(step), [step])

	return (
		<div className={styles.stepsWrapper}>
			<div className={styles.stepLine}>
				<span className={cn(styles.active, {
					[styles.currentStep]: step == 1
				})}>1</span>

				<div className={cn(styles.baseline, {
					[styles.activeLine]: step > 1
				})} />

				<span className={cn({
					[styles.active]: step >= 2,
					[styles.currentStep]: step == 2
				})}>2</span>

				<div className={cn(styles.baseline, styles.line2, {
					[styles.activeLine]: step > 2
				})} />

				<span className={cn({
					[styles.active]: step >= 3,
					[styles.currentStep]: step == 3
				})}>3</span>

				<div className={cn(styles.baseline, styles.line3, {
					[styles.activeLine]: step > 3
				})} />

				<span className={cn({
					[styles.active]: step >= 4,
					[styles.currentStep]: step == 4
				})}>4</span>

				<div className={cn(styles.baseline, styles.line4, {
					[styles.activeLine]: step > 4
				})} />

				<span className={cn({
					[styles.active]: step == 5,
					[styles.currentStep]: step == 5
				})}>5</span>
			</div>

			<h2 className={styles.stepTitle}><span>Шаг {step}</span> из 5 | {memoStepText} </h2>

		</div>
	)
}
import { Calendar } from "../calendar"
import { Card } from "../card"
import { Guests } from "../guests"
import { PromoCode } from "../promoCode"

interface Campus {
	image: string;
	name: string;
	title: string;
	description: string;
	id: string;
}

interface SelectComponent {
	step: number;
	campusesArray: Campus[];
}

export const SelectComponent = ({ step = 1, campusesArray }: SelectComponent): JSX.Element => {

	switch (step) {
		case 1: return (
			<>
				{
					campusesArray && campusesArray.map((campus: any, index: number) => (
						<Card
							index={index}
							key={campus.id}
							image={campus.image}
							name={campus.name}
							title={campus.title}
							description={campus.description} />
					))
				}
			</>
		)
		case 2: return <Calendar />
		case 3: return <Guests />
		case 4: return <PromoCode />
		default: return <></>
	}
}
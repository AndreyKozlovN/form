import React, { useContext, useState } from 'react';
import styles from "./style.module.css";
import { BookingContext } from "../../context/booking.context";

export const PromoCode = (): JSX.Element => {
  const { setDescriptionTitle } = useContext(BookingContext)
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    setDescriptionTitle && setDescriptionTitle(`Промокод: ${newValue.toUpperCase()}`)
    if (newValue.length <= 35) {
      setInputValue(newValue);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Если у Вас есть промокод, введите его в поле ниже и получите скидку.</h3>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

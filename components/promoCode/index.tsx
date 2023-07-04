import React, { useContext, useState, useEffect } from 'react';
import styles from "./style.module.css";
import { BookingContext } from "../../context/booking.context";

export const PromoCode = (): JSX.Element => {
  const { setDescriptionTitle, setDescriptionText, promocode, setPromocode } = useContext(BookingContext)
  const [inputValue, setInputValue] = useState(promocode);


  useEffect(() => {
    setDescriptionTitle && setDescriptionTitle(`Промокод: ${promocode}`)
    setDescriptionText && setDescriptionText(' ')
  }, [promocode, setDescriptionText, setDescriptionTitle])


  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    setPromocode && setPromocode(`${newValue.toUpperCase()}`)
    setDescriptionTitle && setDescriptionTitle(`Промокод: ${promocode}`)
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

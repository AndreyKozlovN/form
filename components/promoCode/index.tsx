import React, { useState } from 'react';
import styles from "./style.module.css";

interface PromoCodeProps {
  setDescriptionTitle: (description: string) => void;
}

export const PromoCode = ({ setDescriptionTitle }: PromoCodeProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    setDescriptionTitle(`Промокод: ${newValue.toUpperCase()}`)
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

import styles from "./page.module.css";
import { BookingForm } from "../../components/bookingForm";
import { BookingContextProvider } from "../../context/booking.context";

export default function Home() {

  function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // добавляем ведущий ноль, если число меньше 10
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // добавляем ведущий ноль, если месяц меньше 10
    const year = now.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <main>
      <section className={styles.wrapper}>
        <BookingContextProvider campus={"Корпус"} date={getCurrentDate()} guests={2}>
          <BookingForm />
        </BookingContextProvider>
      </section>
    </main>
  );
}

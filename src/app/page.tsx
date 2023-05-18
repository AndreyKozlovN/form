import Image from "next/image";
import styles from "./page.module.css";
import { BookingForm } from "../../components/bookingForm";

export default function Home() {
  return (
    <main>
      <section className={styles.wrapper}>
        <BookingForm />
      </section>
    </main>
  );
}

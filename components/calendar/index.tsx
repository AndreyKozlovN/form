import Image from "next/image";
import styles from "./style.module.css";
import prevArrow from "./prevArrow.svg";
import nextArrow from "./nextArrow.svg";

export const Calendar = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.prevArrow}
        width={12}
        height={22}
        src={prevArrow}
        alt={"Назад"}
      />

      <div className={styles.firstMonth}>
        <h3 className={styles.monthTitle}>Апрель 2023</h3>
        <div className={styles.weekDayNames}>
          <div>ПН</div>
          <div>ВТ</div>
          <div>СР</div>
          <div>ЧТ</div>
          <div>ПТ</div>
          <div>СБ</div>
          <div>ВС</div>
        </div>
        <div className={styles.monthDays}>
          <div>
            1<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            2<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            3<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            4<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            5<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            6<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            7<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            8<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            9<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            10<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            11<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            12<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            13<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            14<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            15<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            16<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            17<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            18<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            19<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            20<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            21<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            22<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            23<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            24<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            25<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            26<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            27<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            28<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            29<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            30<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            31<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
        </div>
      </div>

      <div className={styles.secondMonth}>
        <h3 className={styles.monthTitle}>Май 2023</h3>
        <div className={styles.weekDayNames}>
          <div>ПН</div>
          <div>ВТ</div>
          <div>СР</div>
          <div>ЧТ</div>
          <div>ПТ</div>
          <div>СБ</div>
          <div>ВС</div>
        </div>
        <div className={styles.monthDays}>
          <div>
            1<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            2<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            3<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            4<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            5<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            6<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            7<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            8<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            9<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            10<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            11<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            12<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            13<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            14<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            15<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            16<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            17<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            18<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            19<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            20<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            21<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            22<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            23<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            24<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            25<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            26<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            27<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            28<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            29<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            30<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
          <div>
            31<p className={styles.monthDaysPrice}>от 5000₽</p>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <p className={styles.descriptionTitle}>
          Заезд 10 апреля - Выезд 14 апреля. Итого 4 ночи.
        </p>
        <p className={styles.descriptionSubtitle}>
          Лучшие цены для 1 гостя за ночь. Цена может быть доступна при
          соблюдении специальных условий бронирования.
        </p>
      </div>

      <Image
        className={styles.nextArrow}
        width={12}
        height={22}
        src={nextArrow}
        alt={"Вперёд"}
      />
    </div>
  );
};

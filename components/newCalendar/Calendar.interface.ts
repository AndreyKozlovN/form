export interface CalendarProps {
  locale?: string;
  selectedDate: any;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

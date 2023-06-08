interface MontProps {
  monthNumber?: number;
  year?: number;
  nextMonth?: boolean;
}

interface CalendarDataItems {
  [date: string]: number;
}

interface CalendarDataProps {
  items: CalendarDataItems;
  code?: number;
}

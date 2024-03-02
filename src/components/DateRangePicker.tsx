import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  pricelistInEuros: {
    intervalStart: string | Date;
    intervalEnd: string | Date;
    pricePerNight: number;
  }[];
  availableDates: {
    intervalStart: string | Date;
    intervalEnd: string | Date;
  }[];
  setFinalCost: (cost: number) => void;
  setNumberOfNights: (nights: number) => void;
  departureDate: Date | null;
  setDepartureDate: (date: Date | null) => void;
  arrivalDate: Date | null;
  setArrivalDate: (date: Date | null) => void;
}

const DateRangePicker = ({
  pricelistInEuros,
  availableDates,
  setFinalCost,
  setNumberOfNights,
  departureDate,
  setDepartureDate,
  arrivalDate,
  setArrivalDate,
}: DateRangePickerProps) => {
  const dateIntervalsCheckIn = availableDates.map((date) => ({
    start: new Date(
      new Date(date.intervalStart).getTime() - 24 * 60 * 60 * 1000,
    ),
    end: new Date(new Date(date.intervalEnd).getTime() - 24 * 60 * 60 * 1000),
  }));

  const dateIntervalsCheckOut = availableDates.map((date) => ({
    start: new Date(
      new Date(date.intervalStart).getTime() - 24 * 60 * 60 * 1000,
    ),
    end: new Date(new Date(date.intervalEnd).getTime()),
  }));
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    pricelistInEuros.forEach((price) => {
      price.intervalStart = new Date(price.intervalStart);
      price.intervalEnd = new Date(price.intervalEnd);
    });
    availableDates.forEach((date) => {
      date.intervalStart = new Date(date.intervalStart);
      date.intervalEnd = new Date(date.intervalEnd);
    });
  }, [pricelistInEuros, availableDates]);

  useEffect(() => {
    if (arrivalDate) {
      const nextAvailableInterval = availableDates.find(
        (interval) =>
          interval.intervalStart >
          new Date(arrivalDate.getTime() + 2 * 60 * 60 * 1000),
      );
      if (nextAvailableInterval) {
        const maxDateValue = new Date(
          (nextAvailableInterval.intervalStart as Date).getTime() - 86400000,
        );
        setMaxDate(maxDateValue);
      } else {
        setMaxDate(null);
      }
    }
  }, [arrivalDate, availableDates]);

  useEffect(() => {
    if (arrivalDate && departureDate) {
      const arrivalDateTime = arrivalDate.getTime();
      const departureDateTime = departureDate.getTime();

      if (!isNaN(arrivalDateTime) && !isNaN(departureDateTime)) {
        let totalCost = 0;
        let nights = 0;

        for (
          let i = arrivalDateTime + 86400000;
          i <= departureDateTime;
          i += 86400000
        ) {
          const currentDate = new Date(
            new Date(i).getTime() + 2 * 60 * 60 * 1000,
          );

          const matchingInterval = pricelistInEuros.find(
            (price) =>
              currentDate >= new Date(price.intervalStart) &&
              currentDate <= new Date(price.intervalEnd),
          );

          if (matchingInterval) {
            totalCost += matchingInterval.pricePerNight;
            nights += 1;
          }
        }
        setFinalCost(totalCost);
        setNumberOfNights(nights);
      }
    }
  }, [
    arrivalDate,
    departureDate,
    pricelistInEuros,
    availableDates,
    setFinalCost,
    setNumberOfNights,
  ]);

  const handleArrivalDate = (date: Date | null) => {
    setArrivalDate(date);
    setDepartureDate(null);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-col">
        <label htmlFor="arrivalDate">Datum dolaska:</label>
        <DatePicker
          selected={arrivalDate}
          onChange={handleArrivalDate}
          includeDateIntervals={dateIntervalsCheckIn}
          className="appearance-none rounded border shadow py-3 px-2 text-gray-500"
          placeholderText="Odaberi datum"
          dateFormat="dd/MM/YYYY"
          id="arrivalDate"
          minDate={new Date()}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="departureDate">Datum odlaska:</label>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          includeDateIntervals={dateIntervalsCheckOut}
          className="appearance-none rounded border shadow py-3 px-2 text-gray-500"
          placeholderText="Odaberi datum"
          dateFormat="dd/MM/YYYY"
          minDate={
            arrivalDate ? new Date(arrivalDate.getTime() + 86400000) : null
          }
          maxDate={maxDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;

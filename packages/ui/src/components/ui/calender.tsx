import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  onChange: (date: Date) => void;
}

function Calendar({ onChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onChange(date); // Pass the date to the parent component
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MMMM yyyy"
      showMonthDropdown
      showYearDropdown
    />
  );
}

export default Calendar;

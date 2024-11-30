import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePicker = ({ onDateChange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    const { startDate, endDate } = ranges.selection;
    onDateChange(startDate, endDate); // Pass the selected dates back to the parent component
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md w-full max-w-sm mx-auto">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className="react-calendar"
      />
    </div>
  );
};

export default DateRangePicker;

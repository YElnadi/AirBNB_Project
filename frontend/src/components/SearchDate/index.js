import React from "react";
import { useState } from "react";
// import DatePicker from "react-date-picker"
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


// DATE PICKER COMPONENT
const SearchDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  return (
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default SearchDate;

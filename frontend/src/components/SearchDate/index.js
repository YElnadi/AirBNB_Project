import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import Reserve from "../Reserve/Reserve";
import { useHistory } from "react-router-dom";
import "./DatePickerStyles.css";
import { addYears } from "date-fns";
import { isSameYear } from "date-fns";

// DATE PICKER COMPONENT
const SearchDate = ({ onSearchDateChange, spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { closeModal } = useModal();
  console.log("spotid search date", spotId);

 

  const currentYear = new Date().getFullYear();
  const minSelectableYear = currentYear;
  const maxSelectableYear = currentYear + 10;
  const minSelectableDate = new Date(minSelectableYear, 0, 1);
  const maxSelectableDate = new Date(maxSelectableYear, 11, 31);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

 

  const confirm = async (e) => {
    closeModal();
    history.push(`/newbooking/${spotId}/${startDate}/${endDate}`);
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    onSearchDateChange(ranges);
  }

 

  //   const startDate_day = startDate.getUTCDate()
  //   const endDate_day = endDate.getUTCDate()

  console.log("start date", startDate);
  console.log("end date", endDate);

  return (
    <>
      <div className="date-picker-wrapper">
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
          minDate={minSelectableDate}
          maxDate={maxSelectableDate}

              
        />
      </div>
      <div>
        <button className="confirm-button" onClick={confirm}>
          Confirm
        </button>{" "}
      </div>
    </>
  );
};

export default SearchDate;

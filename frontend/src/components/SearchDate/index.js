import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useModal } from "../../context/Modal";




// DATE PICKER COMPONENT
const SearchDate = ({onSearchDateChange}) => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { closeModal } = useModal();


  const selectionRange = {
    startDate: startDate ,
    endDate: endDate,
    key: "selection",
  };

  const confirm = async (e) =>{
    closeModal() 
  }
  
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    onSearchDateChange(ranges)
  }

  

//   const startDate_day = startDate.getUTCDate()
//   const endDate_day = endDate.getUTCDate()

  console.log('start date', startDate)
  console.log('end date', endDate)

  

  return (
    <>
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
    <div><button onClick={confirm}>Confirm</button> </div>
    </>
  );
};

export default SearchDate;

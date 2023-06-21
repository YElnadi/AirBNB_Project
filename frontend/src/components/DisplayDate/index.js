import React from 'react';

const DisplayDate = ({startDate, endDate}) => {
    console.log('start date dispaly date', startDate)
    
  return (
    <div>
      <p>Start Date: {startDate}</p>
      
    </div>
  );
}

export default DisplayDate;

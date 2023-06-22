import React from 'react';

const DisplayDate = ({startDate, endDate}) => {
  console.log('startdate display date', startDate)
    console.log('end date dispaly date', endDate)
    
  return (
    <div>
      <p>Check-in: {startDate}</p>
      <p>Checkout: {startDate}</p>
    </div>
  );
}

export default DisplayDate;

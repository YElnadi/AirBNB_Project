import React from 'react';

const Reserve = ({startDate, endDate}) => {
console.log(startDate)

  return (
    <div>
      Request to Book
      <div>Your Trip
        <p>Dates</p>
        <p>{startDate}</p>
        
      </div>

    </div>
  );
}

export default Reserve;

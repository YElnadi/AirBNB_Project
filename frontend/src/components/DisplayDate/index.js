import React from 'react';
import { useState } from 'react';

const DisplayDate = ({start, end}) => {
  const [startDate, setStartDate] = useState(start)
    
  return (
    <div>
      <p>Checkn: {start}</p>
      <p>Checkout: {end}</p>
    </div>
  );
}

export default DisplayDate;

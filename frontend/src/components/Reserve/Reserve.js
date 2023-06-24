import React from 'react';
import { useParams } from 'react-router-dom';

const Reserve = () => {
const {spotId} = useParams()
console.log('spotId reserve', spotId)

const {startDate} = useParams()
console.log('startdate reserve', startDate)

const {endDate} = useParams()
console.log('enddate reserve', endDate)


  return (
    <div>
      Request to Book
      <div>Your Trip
        <p>Dates</p>
        <p>{spotId}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>

        
      </div>

    </div>
  );
}

export default Reserve;

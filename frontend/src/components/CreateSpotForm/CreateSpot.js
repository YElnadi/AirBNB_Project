import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createSpot} from '../../store/spots'

const CreateSpot = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [lng, setLongitude] = useState('')
    const [lat, setLatitude] = useState('')
    const [showForm, setShowForm] = useState(false);


    const handleSubmit = async (e) =>{
        e.preventDefault();

        const spotDetails={
            address,
            state,
            city,
            country,
            name,
            description,
            price,
            lng,
            lat
        }

        let createdSpot;
        createdSpot = await dispatch(createSpot(spotDetails))
        if(createdSpot){
           history.push(`/api/spots/current`)
            reset();
        }
    }
    const reset = ()=>{
        
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setDescription('');
        setLatitude('');
        setLongitude('');
        setName('');
        setPrice('');

    }

    

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            placeholder='Enter Address'
            />
            <input
            type='text'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required
            placeholder='Enter State'
            />
            <input
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
            placeholder='Enter City'
            />
            <input
            type='text'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            required
            placeholder='Enter Country'
            />
            <input
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            placeholder='Enter Name'
            />
            <input
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            placeholder='Enter Description'
            />
            <input
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
            placeholder='Enter Price'
            />
            <input
            type='number'
            value={lat}
            onChange={(e)=>setLatitude(e.target.value)}
            required
            placeholder='Enter Latitiude'
            />
            <input
            type='number'
            value={lng}
            onChange={(e)=>setLongitude(e.target.value)}
            required
            placeholder='Enter Longitude'
            />
            <button type='submit'> Create a Spot</button>

        </form>
      
    </div>
  );
}

export default CreateSpot;

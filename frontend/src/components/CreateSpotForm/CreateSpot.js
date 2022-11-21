import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {createSpot} from '../../store/spots'
import './CreateSpot.css'

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
    const [imageUrl, setImageUrl] = useState('')
    
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser){
        history.push('/')
        window.alert('must be logged in')
    }


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
            lng:1,
            lat:1,
            imageUrl
        }

        let createdSpot;
        createdSpot = await dispatch(createSpot(spotDetails))
        if(createdSpot){
           history.push(`/`)
            reset();
        }
    }
    const reset = ()=>{
        
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setDescription('');
        setName('');
        setPrice('');
        setImageUrl('');


    }

    
    

  return (
    <div className='create--spot--container'>
        <h1 style={{alignText:'center'}}>Create your Spots</h1>
        <form onSubmit={handleSubmit}>
            <div className='create--spot--field'>
            <input
            type='text'
            placeholder="Enter Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='text'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required
            placeholder='Enter State'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
            placeholder='Enter City'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='text'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            required
            placeholder='Enter Country'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            placeholder='Enter Name'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            placeholder='Enter Description'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
            placeholder='Enter Price'
            />
            </div>

            <div className='create--spot--field'>
            <input
            type='url'
            value={imageUrl}
            onChange={(e)=>setImageUrl(e.target.value)}
            required
            placeholder='Enter Image Url'
            />
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <button className='button--create--spot'style={{margin:20}}type='submit'> Create a Spot</button>
            </div>

        </form>
      
    </div>
  );
}

export default CreateSpot;

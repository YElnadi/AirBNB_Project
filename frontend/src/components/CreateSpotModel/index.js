import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createNewSpot } from '../../store/spots';


const CreateSpotModel = () => {
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
    const { closeModal } = useModal();


    const sessionUser = useSelector(state => state.session.user);
    
    const cancel = async (e) =>{
        closeModal() 
        reset()
        history.push('/')
     
      }

    if(!sessionUser){
      history.push('/')
      window.alert('must be logged in')
      closeModal()
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
        createdSpot = await dispatch(createNewSpot(spotDetails))
        .then(closeModal)
        history.push('/')

        
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
    <div>
        <h2>Create your spot</h2>
        <form onSubmit={handleSubmit}>
            <label>
              Address
            <input 
            type='text'
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            min
            />
            </label>

            <label >
              State
            <input 
            type='text'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required
            />
            </label>

            <label >
              City
            <input 
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
            />
            </label>

            <label >
              Country
            <input 
            type='text'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            required
            />
            </label>

            <label >
              Name
            <input 
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
            </label>

            <label >
              Description
            <input
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            />
            </label>

            <label >
              Price
            <input 
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
            />
            </label>

            <label >
              Image
            <input 
            type='url'
            value={imageUrl}
            onChange={(e)=>setImageUrl(e.target.value)}
            required
            />
            </label>

            
            <button type='submit'> Save</button>
            <button onClick={cancel}> Cancel</button>
            

        </form>

      
    </div>
  );
}

export default CreateSpotModel;

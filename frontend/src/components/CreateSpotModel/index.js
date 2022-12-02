import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";


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
    
    const cancel = () =>{
        history.push('/')
        return;
      }

    // if(!sessionUser){
    //     history.push('/')
    //     window.alert('must be logged in')
    //     return;
    // }

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

        // let createdSpot;
        // createdSpot = await dispatch((spotDetails))
        // .then(closeModal)
        // if(createdSpot){
        //    history.push(`/`)
        //     reset();
        // }
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
            <div>
            <input 
            type='text'
            placeholder="Enter Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            />
            </div>

            <div >
            <input 
            type='text'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required
            placeholder='Enter State'
            />
            </div>

            <div >
            <input 
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
            placeholder='Enter City'
            />
            </div>

            <div >
            <input 
            type='text'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            required
            placeholder='Enter Country'
            />
            </div>

            <div >
            <input 
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            placeholder='Enter Name'
            />
            </div>

            <div >
            <input
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            placeholder='Enter Description'
            />
            </div>

            <div >
            <input 
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
            placeholder='Enter Price'
            />
            </div>

            <div >
            <input 
            type='url'
            value={imageUrl}
            onChange={(e)=>setImageUrl(e.target.value)}
            required
            placeholder='Enter Image Url'
            />
            </div>

            <div>
            <button type='submit'> Save</button>
            <button onClick={cancel}> Cancel</button>
            </div>

        </form>

      
    </div>
  );
}

export default CreateSpotModel;

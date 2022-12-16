import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createNewSpot } from '../../store/spots';
import './CreateSpotModal.css'
import '../Common/FormCommon.css'


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
    const [previewImage, setPreviewImage] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmited] = useState(false)
    const { closeModal } = useModal();



    const sessionUser = useSelector(state => state.session.user);

    useEffect(()=>{
      const errors = []
      if(!address) errors.push('Spot must have an address')
      if(address.length<10) errors.push('please enter full address')
      if(!state) errors.push('Spot must have a state')
      if(state.length<2) errors.push('Please enter state name not less than 1 characters')
      if(!city) errors.push('Spot must have a city')
      if(city.length<2) errors.push('Please enter the city name not less than 1 character')
      if(!country) errors.push('Spot must have a country')
      if(country.length<2) errors.push('Please enter a country name not less than 1 character')
      if(!name) errors.push('Spot must have a name')
      if(name.length>50) errors.push('Please enter a name that is less than 50 characters')
      if(name.length<=1) errors.push('Please enter a name that is greater than 10 characters')
      if(!description) errors.push('Spot must have a description')
      if(description.length<10) errors.push('Please descripe your spot not less than 10 characters')
      if(description.length>5000) errors.push('Please descripe your spot not greather than 5000 characters')
      if(!price) errors.push('Spot must have a price')
      if(price<=0) errors.push('Please enter a price that is greater than 0')
      if(previewImage.length === 0) errors.push('Please provide images for your spot so that your renters know how your spot looks like')
      
      setValidationErrors(errors)

    },[name,city,state,country,address,description,price,previewImage])
    
    const cancel = async (e) =>{
        closeModal() 
        reset()
        // history.push('/')
     
      }

    if(!sessionUser){
      return <>
        <div className='must-login-box'>
          <span style={{fontFamily: 'Geneva, Verdana, sans-serif'}}>
          Please login first.
          </span>
        </div>
      </>
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setHasSubmited(true);
        if(validationErrors.length>0) return;
        const spotDetails={
            name,
            address,
            state,
            city,
            country,
            description,
            price,
            lng:1,
            lat:1,
            previewImage
        }

        await dispatch(createNewSpot(spotDetails))
          .then(spot => history.push(`/spots/${spot.id}`))
          .then(closeModal)
    }

    const reset = ()=>{
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setDescription('');
        setName('');
        setPrice('');
        setPreviewImage('');
        setValidationErrors([]);
        setHasSubmited(false);

    }


  return (
    <>
    <div className='yasbnb-modal-main-div'>
        <h1 className='yasbnb-form-title'>Create New Spot</h1>
    
        <form className='yasbnb-form' onSubmit={handleSubmit}>
        {hasSubmitted && validationErrors.length>0 && (
          <div>
<span style={{fontFamily: 'Geneva, Verdana, sans-serif'}}>The following errors were found:</span>           
 <ul style={{fontFamily: 'Geneva, Verdana, sans-serif'}}>
              {validationErrors.map((error)=>(
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
            <div className="yasbnb-inputs-div">

            <input className='yasbnb-input'
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Name"
            required
            />

            
          

            
            <input className='yasbnb-input'
            type='text'
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            placeholder="Address"
            required
            
            />
            

            

            <input className='yasbnb-input'
            type='text'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            placeholder="State"
            required
            />
          

            

            <input className='yasbnb-input'
            type='text'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            placeholder="City"
            required
            />
            

            

            <input className='yasbnb-input'
            type='text'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            placeholder="Country"
            required
            />
          

            
            

            <textarea 
            className='yasbnb-input'
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Description"
            required
            />
            

            
            <input className='yasbnb-input'
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="Price"
            required
            />
            

            
            <input className='yasbnb-input'
            type='url'
            value={previewImage}
            onChange={(e)=>setPreviewImage(e.target.value)}
            placeholder="Image URL"
            required
            
            />
            </div>

            <div className='yasbnb-btns-div'>
            <button className='yasbnb-btn' type='submit'> Save</button>
            <button className='yasbnb-btn'onClick={cancel}> Cancel</button>
            </div>

        </form>

        </div>
  
    </>
  );
}

export default CreateSpotModel;

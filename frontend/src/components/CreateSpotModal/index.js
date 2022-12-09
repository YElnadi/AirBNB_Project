import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createNewSpot } from '../../store/spots';
import './CreateSpotModal.css'


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
      if(previewImage.length === 0) errors.push('Please provide images for your sopt so that your renters know how your spot looks like')
      
      setValidationErrors(errors)

    },[name,city,state,country,address,description,price,previewImage])

   
    
    const cancel = async (e) =>{
        closeModal() 
        reset()
        history.push('/')
     
      }

    if(!sessionUser){
      window.alert('must be logged in')
      history.push('/')
      closeModal()
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setHasSubmited(true);
        if(validationErrors.length>0) return alert('cannot submit')
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
        setPreviewImage('');
        setValidationErrors([]);
        setHasSubmited(false);

    }


  return (
    <>
    
        {hasSubmitted && validationErrors.length>0 && (
          <div>
            the following errors were found:
            <ul>
              {validationErrors.map((error)=>(
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Create your spot </h2>

        <label >
              Name
            <input 
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
            </label>
          

            
            <label>
              Address
            <input 
            type='text'
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            
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
              Description
            <textarea 
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
            value={previewImage}
            onChange={(e)=>setPreviewImage(e.target.value)}
            required
            
            />
            </label>
            

            <div className='Btn'>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }} type='submit'> Save</button>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }}onClick={cancel}> Cancel</button>
            </div>

        </form>

      
  
    </>
  );
}

export default CreateSpotModel;

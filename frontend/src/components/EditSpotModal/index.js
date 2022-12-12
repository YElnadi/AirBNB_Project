import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { getSingleSpotDetails, thunkUpdateSpot } from '../../store/spots';
import '../CreateSpotModal/CreateSpotModal.css'

const EditSpotModel = ({}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const { spotId } = useParams();
  // console.log('spotId', spotId)
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  //const [previewImage, setPreviewImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmited] = useState(false)
  const { closeModal } = useModal();
  const currentSpot = useSelector(state => state.spots.singleSpot)
  console.log('currentSpot', currentSpot)
  const spotId = currentSpot.id


  useEffect(() => {
    setAddress(currentSpot?.address)
    setCity(currentSpot?.city)
    setState(currentSpot?.state)
    setCountry(currentSpot?.country)
    setName(currentSpot?.name)
    setDescription(currentSpot?.description)
    setPrice(currentSpot?.price)
    //setPreviewImage(currentSpot?.previewImage)
  }, [currentSpot])

 
  useEffect(()=>{
    let errors = []
    if(!address) errors.push('Address is required')
    if(!city) errors.push('City is required')
    if(!country) errors.push('Country is required')
    if(!description) errors.push('Please describe your spot ')
    if(!state) errors.push('state is required')
    if(!name) errors.push ('Please name your spot')
    if(!price) errors.push('please enter price per night')
    //if(!previewImage) errors.push('Please provide an image for your spot')
    setValidationErrors(errors)
  },[name, price,description,address,city,country,state])

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
    // if(previewImage.length === 0) errors.push('Please provide images for your sopt so that your renters know how your spot looks like')
    
    setValidationErrors(errors)

  },[name,city,state,country,address,description,price])


 

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setHasSubmited(true)
    if(validationErrors.length>0) return alert('cannot submit')

    const payload = {
      address,
      state,
      country,
      city,
      name,
      price,
      lat:50,
      lng:50,
      description,
      //previewImage

    }
    let updatedSpot;
    updatedSpot = await dispatch(thunkUpdateSpot(spotId, payload))
    console.log('updatedSpoit', updatedSpot)
    closeModal()
    dispatch(getSingleSpotDetails(spotId))
    //history.push(`/spots/${spotId}`)
}
  //updatedSpot=await dispatch

  const cancel = async (e) =>{
    closeModal() 
    //history.push(`/spots/${spotId}`)
 
  }


  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '400px', background: 'white', borderRadius: '10px'
    }}>
      <h1 style={{ textAlign: 'center', padding: '0 0 20px 0', borderBottom: '1px solid silver',fontFamily:'Geneva, Verdana, sans-serif' }}>Edit Your Spot</h1>

      <form style={{ padding: '0 40px', boxSizing: 'bordar-box',overflowY:'auto', height:'550px' }}onSubmit={handleSubmit}>
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
        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>Name</spam> 
          <input className='input'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>Address</spam> 
          <input className='input'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required

          />
        </label>

        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>State</spam> 
          <input className='input'
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>

        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>City</spam> 
          <input className='input'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>Country</spam> 
          <input className='input'
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>


        
          <label className='label'>
          <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>Description</spam> 
            <textarea className='textarea'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        

        <label className='label'>
        <spam style={{fontFamily:'Geneva, Verdana, sans-serif', color:'#888'}}>price</spam> 
          <input className='input'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        {/* <label >
          Image
          <input
            type='url'
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required

          />
        </label> */}


        <div className='Btn'>
        <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '15px', fontWeight: '700px' }}type='submit'>Save Updates</button>
        <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '15px', fontWeight: '700px' , marginBottom:'20px'}} onClick={cancel}>Cancel</button>
        </div>

      </form>
    </div>
  );
}

export default EditSpotModel;

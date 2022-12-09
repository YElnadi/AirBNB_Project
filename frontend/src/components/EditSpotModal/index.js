import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { getSingleSpotDetails, thunkUpdateSpot } from '../../store/spots';

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

  

 

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setHasSubmited(true)
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
    <div>
      <h1>Edit Your Spot</h1>
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
        <label >
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required

          />
        </label>

        <label >
          State
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>

        <label >
          City
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label >
          Country
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>


        
          <label >
            Description
            <textarea
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        

        <label >
          Price
          <input
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

        <button type='submit'>Save Updates</button>
        <button onClick={cancel}>Cancel</button>


      </form>
    </div>
  );
}

export default EditSpotModel;

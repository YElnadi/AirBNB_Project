import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const EditSpotForm = () => {
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

  const updateAddress = (e) => setAddress(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateImageUrl = (e) => setImageUrl(e.target.value)


  return (
    <div>
      <h1>Edit Page</h1>
    </div>
  );
}

export default EditSpotForm;

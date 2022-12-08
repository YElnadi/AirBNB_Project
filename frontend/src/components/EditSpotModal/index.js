import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory,useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";

const EditSpotModel = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {spotId} = useParams();
  //console.log('spotId', spotId)
  
  return (
    <div>
      <button>Edit</button>
    </div>
  );
}

export default EditSpotModel;

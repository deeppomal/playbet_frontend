import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { getUser } from '../reducers/userReducer';

const ProtectedRoute = ({children}) => {

    const userStored = useSelector(getUser);
    let location = useLocation();
    const checkUser = JSON.parse(localStorage.getItem('userData'));
    if(!checkUser?.username) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;
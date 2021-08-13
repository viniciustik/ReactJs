import React from 'react'

import { Redirect, Route } from 'react-router'

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('app-token')
    console.log(isLogged, 'isLogged')
    return isLogged ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute
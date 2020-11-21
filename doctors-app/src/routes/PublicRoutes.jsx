import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../Components/Register';
import Login from '../Components/Login';
import Home from '../Components/Home';
import Patient from '../Components/Patient';
import ProfileData from '../Components/ProfileData';
export default function Routing(props) {
    return (
        <Switch>
            <Route path="/" exact render={(props) => <Login {...props} />} />
            <Route path="/ProfileData" exact render={() => <ProfileData />} />
            <Route path="/Register" exact render={() => <Register />} />
            <Route path="/Home" exact render={() => <Home />} />
            <Route path="/Home/:id" exact render={(props) => <Patient {...props} />} />

            <Route render={() => <h3>Page not found</h3>} />
        </Switch>
    );
}

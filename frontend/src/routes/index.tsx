import React from 'react'

import {Switch, Route} from 'react-router-dom'

import signIn from '../pages/signIn';
import signUp from '../pages/signUp';
import events from '../pages/events';

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={events} />
        <Route path='/signUp' component={signUp} />
        <Route path='/signIn' component={signIn} />
    </Switch>
)

export default Routes;
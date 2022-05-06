import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';
import Custormers from '../Pages/Custormers';
import New from '../Pages/New';

export default function Routes(){
    return(
        <Switch>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/register' component={SignUp} />
            
            <Route exact path='/dashboard' component={dashboard} isPrivate />
            <Route exact path='/profile' component={Profile} isPrivate /> 
            <Route exact path='/customers' component={Custormers} isPrivate />
            <Route exact path='/new' component={New} isPrivate />
            <Route exact path='/new/:id' component={New} isPrivate />
        </Switch>
    )
}
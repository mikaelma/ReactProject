import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './screens/main-page';


const Main = () => (
    <main>
        <Switch>
            <Route exact path={'/'} component={MainPage} />
            <Route path = {'/Profile'} component = {ProfilePage} />
            <Route path = {'/Notes'} component = {NotePage} />
        </Switch>
    </main>
);

export default Main
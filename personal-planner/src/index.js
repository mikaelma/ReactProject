import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProfilePage from './screens/profile-page';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route path='/' component={App} />
                <Route path = {'/Profile'} component = {ProfilePage} />
            </div>
        </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();

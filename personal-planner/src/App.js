import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainPage from './screens/main-page';
import Main from './main';
import { AppBar, Button } from 'material-ui';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import './App.css';

const LinkButton = withRouter(({ history}) => (
    <button
        type='button'
        onClick={() => { history.push('/Profile') }}
    >
        Click Me!
    </button>
));


class App extends Component{

    render(){
        return (
            <MuiThemeProvider>
                <AppBar
                    title='Kollektivet'
                    showMenuIconButton={false}
                    iconClassNameRight="fa fa-user"
                    onRightIconButtonTouchTap={() => console.log("Button Click") }
                >
                    <LinkButton />
                </AppBar>
                <Main
                />
            </MuiThemeProvider>
        )
    }
};


export default App;

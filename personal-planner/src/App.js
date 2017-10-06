import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './layout-main';
import './App.css';

class App extends Component{
    render(){
        return (
            <MuiThemeProvider>
                <MyAwesomeReactComponent />
            </MuiThemeProvider>
        )
    }
};

export default App;

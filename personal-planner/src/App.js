import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainPage from './screens/main-page';
import './App.css';

class App extends Component{
    render(){
        return (
            <MuiThemeProvider>
                <MainPage />
            </MuiThemeProvider>
        )
    }
};

export default App;

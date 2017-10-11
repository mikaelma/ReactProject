import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainPage from './screens/main-page';
import Main from './main';
import { AppBar, Button } from 'material-ui';

import './App.css';

class App extends Component{

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        return (
            <MuiThemeProvider>
                <AppBar
                    title='Kollektivet'
                    onTitleTouchTap={() => this.nextPath('/') }
                    titleStyle={(}
                    showMenuIconButton={false}
                    iconClassNameRight="fa fa-user"
                    onRightIconButtonTouchTap={() => this.nextPath('/Profile') }
                    style={{marginBottom: 30}}
                >
                </AppBar>
                <Main
                />
            </MuiThemeProvider>
        )
    }
};


export default App;

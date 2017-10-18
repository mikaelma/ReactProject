import React, { Component } from 'react';
import Main from './main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import './App.css';

//Customizing the theme to use our own colors and a bigger appbar.
const muiTheme = getMuiTheme({
    palette: {
        textColor: '#211A1E',
        primary1Color: '#C3423F',
        accent1Color: '#2E86AB'
    },
    appBar: {
        height: 60,
    },
});

class App extends Component{

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        return (
            <div>
                {/*Wrap the application in the theme*/}
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <AppBar
                            title='Kollektivet'
                            onTitleTouchTap={() => this.nextPath('/') }
                            showMenuIconButton={false}
                            iconClassNameRight="fa fa-user"
                            onRightIconButtonTouchTap={() => this.nextPath('/Profile') }
                            titleStyle={{fontSize: '40pt', fontFamily: 'Roboto Condensed'}}
                        >
                        </AppBar>
                        <Main />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
};


export default App;


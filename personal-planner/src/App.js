import React, { Component } from 'react';
import Main from './main';
import { AppBar } from 'material-ui';

import './App.css';

class App extends Component{

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        return (
            <div>
                <AppBar
                    title='Kollektivet'
                    onTitleTouchTap={() => this.nextPath('/') }
                    showMenuIconButton={false}
                    iconClassNameRight="fa fa-user"
                    onRightIconButtonTouchTap={() => this.nextPath('/Profile') }
                    style={{marginBottom: 30}}
                >
                </AppBar>
                <Main />
            </div>
        )
    }
};


export default App;

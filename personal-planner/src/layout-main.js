import React, { Component } from 'react';
import { AppBar, Button } from 'material-ui';
import MainContainer from './components/containers/main-container';

class LayoutMain extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <AppBar
                    title='Kollektivet'
                    showMenuIconButton={false}
                    iconClassNameRight="fa fa-user"
                />
                <div style={style.mainContainerStyle}>
                    <MainContainer>
                        TODOLIST
                    </MainContainer>
                    <MainContainer>
                        Calendar
                    </MainContainer>
                </div>
            </div>
        )
    }
}

const style = {
    mainContainerStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
};

export default LayoutMain;
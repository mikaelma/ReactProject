import React, { Component } from 'react';
import { AppBar, Button } from 'material-ui';
import MainContainer from '../components/containers/main-container';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

class MainPage extends Component {
    constructor(props){
        super(props)

        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
    }

    render(){
        return (
            <div>
                <div style={style.mainContainerStyle}>
                    <MainContainer>
                        TODOLIST
                    </MainContainer>
                    <MainContainer>
                        <BigCalendar
                            events={[]}
                            startAccessor='startDate'
                            endAccessor='endDate'
                        />
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

export default MainPage;
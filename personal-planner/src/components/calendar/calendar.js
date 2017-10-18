import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css';


// Calendar component.

//Setting the time zone
BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class Calendar extends Component{
    constructor(props){
        super(props);

        this.state = {
            calendarView: 'week'
        };
    }
    

    render(){
        return (
                <BigCalendar
                    style={style.calendarStyle}
                    events={this.props.events}
                    defaultDate={new Date()}
                    startAccessor='start'
                    endAccessor='end'
                    titleAccessor='title'
                    messages={messages}
                    selectable={true}
                    views={['month', 'week', 'day']}
                    view={this.state.calendarView}
                    onView={(calendarView)=>{
                        this.setState({ calendarView })
                    }}
                />
        )
    }
}


const style = {
    calendarStyle: {
        alignSelf: 'stretch',
        margin: 10
    },
};

//Styling all elements so they are in Norwegian
const messages = {
    allDay: 'Kl',
    previous: '<',
    next: '>',
    today: 'I dag',
    month: 'Måned',
    week: 'Uke',
    day: 'Dag',
    agenda: 'Agenda',
    date: 'Dato',
    time: 'Tid',
    event: 'Hendelse',
};

//Exporting the component
export default Calendar;
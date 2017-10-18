import React from 'react';
import { TimePicker } from 'material-ui';

//Component for picking the time when adding an element to
//the calendar component.

const TimePickerForm = (props) => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: props.marginLeft, marginRight: props.marginRight}}>
            {props.title}
            <TimePicker
                hintText={props.placeholder}
                format='24hr'
                onChange={(event, time) => props.setTime(time)}
                textFieldStyle={{width: props.width}}
                errorText={props.errorText}
            />
        </div>
    )
};

export default TimePickerForm;
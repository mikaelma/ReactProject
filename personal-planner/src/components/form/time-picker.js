import React from 'react';
import { TimePicker } from 'material-ui';

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
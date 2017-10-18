import React from 'react';
import { DatePicker } from 'material-ui';

//Form for choosing the date in the calendar.
const DateForm = (props) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginRight: props.marginRight}}>
            {props.title}
            <DatePicker
                value={props.date}
                hintText={props.placeholder}
                onChange={(event, date) => props.setDate(date)}
                formatDate={props.formatDate}
                textFieldStyle={{width: props.width}}
                errorText={props.errorText}
            />
        </div>
    )
};

export default DateForm;

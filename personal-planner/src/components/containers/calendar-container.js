import React from 'react';

//The Calendar container
const CalendarContainer = (props) => {
    return (
        <div style={styles.containerStyle}>
            {props.children}
        </div>
    )
};

//Styles the container with flex
const styles = {
    containerStyle: {
        display: 'flex',
        height: '80vh',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
}

//Exports the container so its available outside the script
export default CalendarContainer;
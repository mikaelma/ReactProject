import React from 'react';

const CalendarContainer = (props) => {
    return (
        <div style={styles.containerStyle}>
            {props.children}
        </div>
    )
};

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

export default CalendarContainer;
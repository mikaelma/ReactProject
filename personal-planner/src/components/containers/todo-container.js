import React from 'react';

// Container for the todolist
const ToDoContainer = (props) => {
    return (
        <div style={styles.containerStyle}>
            {props.children}
        </div>
    )
};

// Styles the component with flex container.
const styles = {
    containerStyle: {
        display: 'flex',
        height: '80vh',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
}

//Export the container so its avaiable outside the script
export default ToDoContainer;
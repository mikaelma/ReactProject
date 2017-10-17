import React from 'react';

const ToDoContainer = (props) => {
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
}

export default ToDoContainer;
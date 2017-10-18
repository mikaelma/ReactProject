import React from 'react';

//Container for the main page
const MainContainer = (props) => {
    return (
        <div style={styles.containerStyle}>
            {props.children}
        </div>
    )
};

//Styles the component with flex.
const styles = {
    containerStyle: {
        display: 'flex',
        height: '90vh',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
}

//Export the container so its available outside
export default MainContainer;
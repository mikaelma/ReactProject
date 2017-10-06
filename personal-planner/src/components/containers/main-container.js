import React from 'react';

const MainContainer = (props) => {
    return (
        <div style={styles.containerStyle}>
            {props.children}
        </div>
    )
};

const styles = {
    containerStyle: {
        display: 'flex',
        flex: 1,
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
}

export default MainContainer;
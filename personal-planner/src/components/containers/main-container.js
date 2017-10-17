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
        height: '90vh',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
}

export default MainContainer;
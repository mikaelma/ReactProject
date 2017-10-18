import React from 'react';
import {IconButton} from 'material-ui';

const Note = (props) =>{
    return(
        <div style ={style.noteContainer}>
            <h1>{this.props.title}</h1>
            <div>{this.props.content}</div>
            <IconButton iconClassName="fa fa-times" onClick={this.props.remove(this.props.key)}/>
        </div>
    )
}

const style = {
    noteContainer:{
        display:'flex',
        flexDirection:'column',
        
    }
}
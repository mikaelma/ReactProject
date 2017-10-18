import React, {Component} from 'react';
import {TextField,Dialog,RaisedButton} from 'material-ui';
class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            desktop:window.innerWidth < 700 ? false : true,
            title:"",
            text:""
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose =() => {
        this.setState({open:false});
    };
    handleSubmit(){
        this.setState({open:false});
        this.props.submit({title:this.state.title,text:this.state.text});
    }

    render(){
        return(
            <div>
            <Dialog
                title="NYTT NOTAT"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
            <TextField
            floatingLabelText="Tittel"
            onChange= {(e)=>this.setState({title:e.target.value})}
            />
            <br/>
            <TextField
            floatingLabelText="Notat"
            multiLine={true}
            rows={4}
            onChange= {(e)=>this.setState({text:e.target.value})}
            />
            <br/>
            <RaisedButton primary={true} label="LEGG TIL" onClick={()=>{
                this.handleSubmit();
            }} />

            </Dialog>
            <RaisedButton style={style.add} label="NYTT NOTAT" primary={true} onClick={this.handleOpen}/>
            </div>
        )
    }
}

export default NoteForm;

const style = {
    add:{
        marginTop:'auto'
    }
}
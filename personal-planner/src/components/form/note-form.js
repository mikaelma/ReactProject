import React, {Component} from 'react';
import {TextField,Dialog,RaisedButton} from 'material-ui';
class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            desktop:window.innerWidth < 700 ? false : true,
            title:"",
            text:"",
            titleErrorText:"",
            textErrorText:"",
        }
    }

    //Handling events
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({open:false});
    };
    handleSubmit = () => {
        if(!this.state.title || !this.state.text){
            this.state.title ? this.setState({titleErrorText:''}) : this.setState({titleErrorText:'Mangler tittel'}); 
            this.state.text ? this.setState({textErrorText:''}) : this.setState({textErrorText:'Mangler innhold'}); 
            console.log("mangler noe");
            return;
        }else{
            console.log("Legger til notat");
            this.props.submit({title:this.state.title,text:this.state.text});
            this.handleClose();
        }   
    }

    render(){
        return(
            <div>
            <Dialog
                title="Ny notat"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{height: 'auto', width: 'auto'}}
            >
            <TextField
            floatingLabelText="Tittel"
            errorText={this.state.titleErrorText}
            onChange= {(e)=>this.setState({title:e.target.value})}
            />
            <br/>
            <TextField
            floatingLabelText="Notat"
            multiLine={true}
            rows={2}
            errorText={this.state.textErrorText}
            onChange= {(e)=>this.setState({text:e.target.value})}
            />
            <br/>
            <RaisedButton primary={true} label="Legg til" onClick={ () => this.handleSubmit()}/>

            </Dialog>
            <RaisedButton style={style.add} label="Ny notat" primary={true} onClick={this.handleOpen}/>
            </div>
        )
    }
}

export default NoteForm;

const style = {
    add:{
        marginTop: 10,
    }
}
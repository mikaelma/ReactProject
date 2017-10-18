import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton'
import NoteForm from '../form/note-form'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';


class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    //Gathering elements from local storage and putting them in state.
    async componentWillMount() {
        let notes = await window.localStorage.getItem('note_items');

        if (notes) {
            this.setState({
                notes: JSON.parse(notes)
            })
        } else {
            this.setState({
                notes: []
            });
        }
    }

    //Method for deleting a note
    removeNote(e, index) {
        let notes = this.state.notes;
        notes.splice(index, 1);
        window.localStorage.setItem('note_items', notes);
        this.setState({ notes: notes });
    }

    //Method for adding a note
    addNote = (note) => {
        console.log(note);
        let notes = this.state.notes;
        notes.push(note);
        window.localStorage.setItem('note_items', JSON.stringify(notes));
        this.setState({ notes: notes })
    }

    render() {
        /*We have to set self = this to use methods later on when we map elements */
        let self = this;
        return (
            <div style={style.containerStyle}>
                <div style={style.notesStyle}>
                    <NoteForm submit={this.addNote}/>
                    <div style={style.scroll}>
                        {this.state.notes.map((note,index)=>{
                            return(
                                <Card style={style.postIt}>
                                <CardHeader
                                    title={note.title}
                                />
                                <CardText>{note.text}</CardText>
                                <CardActions>
                                <IconButton iconClassName="fa fa-times" onClick={(e) =>self.removeNote(e,index) }/>
                                </CardActions>
                            </Card>)
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

//Styles used in the file
const style = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    postIt: {
        backgroundColor: "#FFEB3B",
        marginTop: 10
    },
    notesStyle: {
        display:'flex',
        flexDirection:'column',
        width:'70%',
        height:'100%',
    },
    scroll: {
        maxHeight:'91%',
        overflowY:'scroll',
        flexDirection:'column',
    }
}

export default NoteList;
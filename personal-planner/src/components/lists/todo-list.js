import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import NoteForm from '../form/note-form'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';


class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldValue: '',
            elements: [],
            notes: []
        };

    }

    //Gathering elements from local storage and putting them in state.
    async componentWillMount() {
        let elements = await window.localStorage.getItem('todo_elements');
        let notes = await window.localStorage.getItem('note_items');

        if (elements) {
            console.log(elements);
            this.setState({
                elements: JSON.parse(elements)
            });
        } else {
            this.setState({
                elements: []
            });
        }
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

    //Updates the elements and saves the elements to local storage.
    handleCheck = (e, index) => {
        console.log(index);
        let elements = this.state.elements;
        elements[index].checked = !elements[index].checked;
        this.setState({
            elements: elements,
        }, () => {
            window.localStorage.setItem('todo_elements', JSON.stringify(this.state.elements));
        })
    };

    //Listens for the ENTER key, if the user press ENTER; we add a new todo.
    handleFieldKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                let elements = this.state.elements
                let obj = {
                    title: e.target.value,
                    checked: false
                }
                elements.push(obj)
                this.setState({
                    elements: elements,
                    fieldValue: '',
                });
                window.localStorage.setItem('todo_elements', JSON.stringify(this.state.elements));
                break;
            default:
                break;
        }
    }

    //Updates the fieldValue in state
    handleFieldChange = (e) => {
        this.setState({
            fieldValue: e.target.value,
        })
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
                <div style={style.listStyle}>

                    {/*The textfield for adding new todo elements*/}
                    <TextField
                        onKeyDown={(e) => this.handleFieldKeyDown(e)}
                        defaultValue=""
                        //maxLength="24"
                        value={this.state.fieldValue}
                        onChange={(e) => this.handleFieldChange(e)}
                        floatingLabelText="Legg til nytt element"
                    />

                    {/*Creating all the checkboxes*/}
                    {this.state.elements.map(function (element, index) {
                        return <Checkbox
                            label={element.title}
                            checked={element.checked}
                            key={index}
                            onCheck={(e) => self.handleCheck(e, index)}
                        />
                    })}
                </div>
                <div style={style.notesStyle}>
                    <NoteForm submit={this.addNote} />
                    <div style={style.scroll}>
                        {this.state.notes.map((note, index) => {
                            return (
                                <Card style={style.postIt}>
                                    <CardHeader
                                        title={note.title}
                                    />
                                    <CardText>{note.text}</CardText>
                                    <CardActions>
                                        <IconButton iconClassName="fa fa-times" onClick={(e) => self.removeNote(e, index)} />
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
    listStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        height: '100%',
    },
    notesStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        height: '100%'
    },
    postIt: {
        backgroundColor: "#FFEB3B",
        marginTop: 10
    },
    scroll: {
        maxHeight: '91%',
        overflowY: 'scroll'
    }
}

export default TodoList;
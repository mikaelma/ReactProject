import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';


class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldValue: '',
            elements: [],
        };
    }

    //Gathering elements from local storage and putting them in state.
    async componentWillMount() {
        let elements = await window.localStorage.getItem('todo_elements');

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

    render() {
        /*We have to set self = this to use methods later on when we map elements */
        let self = this;
        return (
            <div style={style.containerStyle}>
                <div style={style.listStyle}>

                    {/*The textfield for adding new todo elements*/}
                    <TextField
                        fullWidth={true}
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
        width: '90%',
        height: '100%',
    },
}

export default TodoList;
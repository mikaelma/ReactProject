import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class TodoList extends Component{

  constructor(props) {
    super(props);
    this.state = {
        fieldValue: '',
        elements:[]
    };
    
}

async componentWillMount(){
    let elements = await window.localStorage.getItem('todo_elements');
    
    if(elements){
        console.log(elements);
        this.setState({
            elements:JSON.parse(elements)
        });
    }

  }

  handleCheck = (e, index) => {
      console.log(index);
      let elements = this.state.elements;
      elements[index].checked = !elements[index].checked;
      this.setState({
          elements: elements,
      })
  }

  handleFieldKeyDown = (e) => {
      switch (e.key){
          case 'Enter':
            let elements = this.state.elements
            let obj = {
                title:e.target.value,
                checked:false
            }
            elements.push(obj)
              this.setState({
                    elements:elements,
                    fieldValue: '',
              });
              window.localStorage.setItem('todo_elements',JSON.stringify(this.state.elements));
              break;
      }
  }
  
  handleFieldChange = (e) => {
      this.setState({
          fieldValue: e.target.value,
      })
  }

  render() {
    let self = this;
    return (
        <div style={style.containerStyle}>

            <TextField
                onKeyDown={ (e) => this.handleFieldKeyDown(e)}
                defaultValue=""
                //maxLength="24"
                value={this.state.fieldValue}
                onChange={(e) => this.handleFieldChange(e)}
                floatingLabelText="Legg til nytt element"
            />

            {this.state.elements.map(function(element, index) {
            return <Checkbox
                label={element.title}
                checked={element.checked}
                key={index}
                onCheck={ (e) => self.handleCheck(e, index)}
                />
            })}
        </div>
    );
  }
}

const style = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
  }

export default TodoList;
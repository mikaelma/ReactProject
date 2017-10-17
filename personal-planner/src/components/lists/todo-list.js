import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class TodoList extends Component{

  constructor(props) {
    super(props);

    this.state = {
        fieldValue: '',
        elements: [{title: 'Gaa paa do', checked: true}, {title: 'Vaske kjøkken', checked: false}, {title: 'Lufte hamster', checked: false}, {title: 'Rydde etter fest', checked: false}],
      };

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
              console.log(e.target.value);
              let elements = this.state.elements;
              elements.push({title: e.target.value, checked: false});
              this.setState({
                  elements: elements,
                  fieldValue: '',
              })
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
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
      },
  }

export default TodoList;
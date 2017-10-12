import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            elements: [{title: 'Gaa paa do', checked: true}, {title: 'Vaske kjøkken', checked: false}, {title: 'Lufte hamster', checked: false}, {title: 'Rydde etter fest', checked:false}],
        };

    }

    handleCheck = (e, index) => {
        console.log(index);
        this.setState({})
    }

    render(){
        let self = this;
        return(
            <div style={style.containerStyle}>
                {this.state.elements.map(function(element, index){
                    return <Checkbox
                        label={element.title}
                        checked={element.checked}
                        index={index}
                        onCheck={ (e) => self.handleCheck(e, index)}
                        />
                })};
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
        height: '100%'
    }
}

export default TodoList;
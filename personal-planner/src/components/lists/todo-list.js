import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            elements:[
                {title: 'Gaa paa do',       checked: true},
                {title: 'Vaske kjøkken',    checked: false},
                {title: 'Lufte hamster',    checked: true},
                {title: 'Rydde etter fest', checked: false}
            ],
        };
        this.updateCheck = this.updateCheck.bind(this);
    }

    updateCheck(event, value) {
        console.log(value + " updating check!");
    }

    render(){
        return(
            <div style={style.containerStyle}>
                {this.state.elements.map((element, index) =>
                    <Checkbox
                        label={element.title}
                        id={index}
                        onCheck={ () => this.updateCheck({index})}

                    />
                )}
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
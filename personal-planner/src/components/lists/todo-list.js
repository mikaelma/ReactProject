import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            elements: [{title: 'Gaa paa do', checked: true}, {title: 'Vaske kjøkken', checked: false}, {title: 'Lufte hamster', checked: false}, {title: 'Rydde etter fest', checked:false}],
        };

    }

    updateCheck(){
        this.setState((oldState) => {
            return{
                checked: !oldState.check,
            };
        });
    }

    render(){
        return(
            <div style={style.containerStyle}>
                {this.state.elements.map(function(element){
                    return <Checkbox
                        label={element.title}
                        checked={element.checked}
                        onCheck={this.updateCheck.bind(this)}
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
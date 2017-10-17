import React, {Component} from 'react';

class NotePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            desktop:window.innerWidth < 700 ? false : true
        }
    }
    render(){
        return(
            <div>yo</div>
        )
    }
}

export default NotePage;
import React, {Component} from 'react';
import { Avatar, FlatButton, TextField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class ProfilePage extends Component{

    constructor(props){

        super(props)

        this.state={
            desktop: window.innerWidth < 700 ? false : true
        }

        //Listener for window size
        const mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(this.WidthChange);
    }


    /**
     * Listens to window resize. If smaller than 700px sets state to not desktop
     * @param mq
     * @constructor
     */
    WidthChange = (mq) => {
        if (mq.matches) {
            this.setState({desktop: true})
        } else {
            this.setState({desktop: false})
        }
    };

    render(){

        return(
            <MuiThemeProvider>
                <div style={style.mainStyle}>
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent:'center' ,
                        alignItems: 'center'
                    }}>
                    <Avatar
                        src={"http://www.qygjxz.com/data/out/190/5691490-profile-pictures.png"}
                        size={150}
                         />

                    <TextField
                        localStorage
                    />

                    <TextField
                    />

                    <TextField
                    />

                    <TextField
                    />

                    <FlatButton
                        label={"Update Info"}
                    />
            </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

    const style = {
        mainStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
    };

export default ProfilePage;
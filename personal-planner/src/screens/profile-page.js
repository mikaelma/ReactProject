import React, {Component} from 'react';
import {Avatar, RaisedButton, TextField} from 'material-ui';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            desktop: window.innerWidth < 700 ? false : true,
            isInfoInStorage: false,
            firstnameField: '',
            surnameField: '',
            emailField: '',
            telephoneField: '',
            firstnameErrorText: '',
            surnameErrorText: '',
            emailErrorText: '',
            telephoneErrorText: ''
        };

        //Listener for window size
        const mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(this.WidthChange);
    }

    //Storing the input values in localStorage.
    async componentWillMount() {
        let userInformation = await JSON.parse(localStorage.getItem("info"));
        if (userInformation) {
            this.setState({
                isInfoInStorage: true,
                firstnameField: userInformation.firstnameField,
                surnameField: userInformation.surnameField,
                emailField: userInformation.emailField,
                telephoneField: userInformation.telephoneField
            })
        }
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

    //Handles button-OnClick. If the information is valid, store it in localStorage.
    handleClick = () => {
        const {firstnameField, surnameField, emailField, telephoneField} = this.state;

        if (!firstnameField || !surnameField || !emailField || !telephoneField) {
            firstnameField ? this.setState({firstnameErrorText: ''}) : this.setState({firstnameErrorText: 'Fornavn mangler'});
            surnameField ? this.setState({surnameErrorText: ''}) : this.setState({surnameErrorText: 'Etternavn mangler'});
            emailField ? this.setState({emailErrorText: ''}) : this.setState({emailErrorText: 'Epost mangler'});
            telephoneField ? this.setState({telephoneErrorText: ''}) : this.setState({telephoneErrorText: 'Telefon-nummer mangler'});
            return;


        } else {
            this.setState({
                isInfoInStorage: !this.state.isInfoInStorage,
                firstnameErrorText: '',
                surnameErrorText: '',
                emailErrorText: '',
                telephoneErrorText: ''
            });
            const info = {
                firstnameField: this.state.firstnameField,
                surnameField: this.state.surnameField,
                emailField: this.state.emailField,
                telephoneField: this.state.telephoneField
            };

            localStorage.setItem("info", JSON.stringify(info));
        }
    };


    /*  Function for handling the two instances of the profile page. I
        If there is information in localStorage, then render a page with the information.
        Else go directly to the input-page.
    */

    renderContent = () => {
        const {isInfoInStorage, firstnameField, surnameField, emailField, telephoneField, firstnameErrorText, surnameErrorText, emailErrorText, telephoneErrorText} = this.state;
        if (isInfoInStorage) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div style={{marginTop: 20}}>
                        {firstnameField + " " + surnameField}

                    </div>

                    <div style={{marginTop: 20}}>
                        {emailField}
                    </div>

                    <div style={{marginTop: 20}}>
                        {telephoneField}
                    </div>

                    <RaisedButton
                        primary={true}
                        style={{marginTop: 20}}
                        label={"Rediger Informasjon"}
                        onClick={() => this.setState({isInfoInStorage: false})}
                    />
                </div>
            )
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        floatingLabelText="Fornavn"
                        onChange={(e) => this.setState({firstnameField: e.target.value, firstnameErrorText: ''})}
                        value={firstnameField}
                        errorText={firstnameErrorText}
                    />

                    <TextField
                        floatingLabelText="Etternavn"
                        onChange={(e) => this.setState({surnameField: e.target.value, surnameErrorText: ''})}
                        value={surnameField}
                        errorText={surnameErrorText}
                    />

                    <TextField
                        floatingLabelText="Epost"
                        onChange={(e) => this.setState({emailField: e.target.value, emailErrorText: ''})}
                        value={emailField}
                        errorText={emailErrorText}
                    />

                    <TextField
                        floatingLabelText="Telefon"
                        onChange={(e) => this.setState({telephoneField: e.target.value, telephoneErrorText: ''})}
                        value={telephoneField}
                        errorText={telephoneErrorText}
                    />

                    <RaisedButton
                        primary={true}
                        label={"Lagre"}
                        onClick={this.handleClick}
                        style={{marginTop: 20}}
                    />

                </div>
            )
        }

    }

    //This renders regardless of the information put in by the user.
    render() {
        return (
            <div style={style.mainStyle}>
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>

                    {/*
                    The avatar is just a thumbnail profile picture.
                    There is no functionality for changing profile pic
                    */}
                    <Avatar
                        style={{marginTop: 20}}
                        src={"http://www.qygjxz.com/data/out/190/5691490-profile-pictures.png"}
                        size={150}
                    />

                    {this.renderContent()}
                </div>
            </div>
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
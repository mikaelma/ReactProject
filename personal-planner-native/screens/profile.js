import React, {Component} from 'react';
import {View, Text, AsyncStorage, ScrollView, TextInput} from 'react-native';
import {Avatar, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import colors from '../config/colors.js'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }


    //Gathering the input values from AsyncStorage.
    async componentWillMount() {
        try {
            const userInformation = await AsyncStorage.getItem('info');//

            userInformationParsed= JSON.parse(userInformation);

            if (userInformationParsed) {
                this.setState({
                    isInfoInStorage: true,
                    firstnameField: userInformationParsed.firstnameField,
                    surnameField: userInformationParsed.surnameField,
                    emailField: userInformationParsed.emailField,
                    telephoneField: userInformationParsed.telephoneField,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


    async saveData() {
        try {
            await AsyncStorage.setItem("info", JSON.stringify(this.state))
        } catch (error) {
            console.log("Error saving data!" + error);
        }
    }

//
    //Handles button-OnClick. If the information is valid, store it in AsyncStorage.
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
            this.saveData();
        }
    };

    /*  Function for handling the two instances of the profile page.
        If there is information in AsyncStorage, then render a page with the information.
        Else go directly to the input-page.
    */
//
    renderContent = () => {
        const {
            isInfoInStorage, firstnameField, surnameField, emailField, telephoneField,
            firstnameErrorText, surnameErrorText, emailErrorText, telephoneErrorText
        } = this.state;

        if (isInfoInStorage) {
            return (
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {/*
                    The avatar is just a thumbnail profile picture.
                    There is no functionality for changing profile pic
                    */}
                    <Avatar
                        xlarge={true}
                        rounded={true}
                        style={{marginTop: 20}}
                        source={{uri: "http://www.qygjxz.com/data/out/190/5691490-profile-pictures.png"}}
                    />

                    <Text style={{marginTop: 80, fontWeight: 'bold'}}>Navn:</Text>
                    <View>
                        <Text>{firstnameField + " " + surnameField}</Text>
                    </View>

                    <Text style={{marginTop: 20, fontWeight: 'bold'}}>Epost:</Text>
                    <View>
                        <Text>{emailField}</Text>
                    </View>
                    <Text style={{marginTop: 20, fontWeight: 'bold'}}>Telefon-nummer:</Text>

                    <View>
                        <Text>{telephoneField}</Text>
                    </View>

                    <Button

                        raised={true}
                        style={styles.buttonStyle}
                        textStyle={{fontWeight: 'bold'}}
                        containerViewStyle={styles.buttonContainerStyle}
                        backgroundColor='white'
                        color="black"
                        title={"Rediger Informasjon"}
                        onPress={() => this.setState({isInfoInStorage: false})}
                    />
                </View>
            );
        } else {
            return (
                <ScrollView style={{height: '200%', width: '100%'}}
                            keyboardDismissMode={'on-drag'}
                >
                        <View style={{marginTop: 10, marginLeft:25, marginRight: 10}}>
                            <FormLabel>Fornavn</FormLabel>
                            <TextInput  style={styles.textInputStyle}
                                        value={this.state.firstnameField}
                                        onChangeText={(text) => this.setState({
                                           firstnameField: text,
                                           firstnameErrorText: ''
                                        })}
                                        underlineColorAndroid={colors.secondaryColor}
                                        autoFocus={true}
                            />
                            <FormValidationMessage>{firstnameErrorText}</FormValidationMessage>
                        </View>

                        <View style={{marginTop: 5, marginLeft:25, marginRight: 10}}>
                            <FormLabel>Etternavn</FormLabel>
                            <TextInput  style={styles.textInputStyle}
                                        value={this.state.surnameField}
                                        onChangeText={(text) => this.setState({
                                           surnameField: text,
                                           surnameErrorText: ''
                                        })}
                                        underlineColorAndroid={colors.secondaryColor}
                                        autoFocus={true}
                            />
                            <FormValidationMessage>{surnameErrorText}</FormValidationMessage>
                        </View>

                        <View style={{marginTop: 5, marginLeft:25, marginRight: 10}}>
                            <FormLabel>Email</FormLabel>
                            <TextInput  style={styles.textInputStyle}
                                        value={this.state.emailField}
                                        onChangeText={(text) => this.setState({emailField: text, emailErrorText: ''})}
                                        underlineColorAndroid={colors.secondaryColor}
                                        autoFocus={true}
                            />
                            <FormValidationMessage>{emailErrorText}</FormValidationMessage>
                        </View>

                        <View style={{marginTop: 5, marginLeft:25, marginRight: 10}}>
                            <FormLabel>Telefon-nummer</FormLabel>
                            <TextInput  style={styles.textInputStyle}
                                        value={this.state.telephoneField}
                                        onChangeText={(text) => this.setState({
                                           telephoneField: text,
                                           telephoneErrorText: ''
                                        })}
                                        underlineColorAndroid={colors.secondaryColor}
                                        keyboardType={'numeric'}
                            />
                            <FormValidationMessage>{telephoneErrorText}</FormValidationMessage>
                        </View>

                        <Button
                            style={styles.buttonStyle}
                            textStyle={{fontWeight: 'bold'}}
                            containerViewStyle={styles.buttonContainerStyle}
                            backgroundColor='white'
                            color="black"
                            raised={true}
                            title={"Lagre"}
                            onPress={() => this.handleClick()}
                        />
                </ScrollView>
            )
        }
    };

//This renders regardless of the information put in by the user.
    render() {
        return (
            <View style={styles.mainStyle}>
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>
                    {this.renderContent()}
                </View>
            </View>
        )
    };
}

const styles = {
    mainStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },

    buttonStyle: {
        borderWidth: 2,
        borderColor: colors.primaryColor
    },

    buttonContainerStyle: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 20,
    },

    textInputStyle:{
        width: 300,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#F0F0F0',
    }
};



export default Profile;
import React, { Component } from 'react';
import {
    View,
    Picker,
    Platform,
} from 'react-native';
import { FormLabel, Button, FormValidationMessage } from 'react-native-elements'
import colors from '../config/colors'
import DatePicker from 'react-native-datepicker'

class BookingForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: '',
            date: '',
            startTime: '',
            endTime: '',
            dateErrorText: '',
            startTimeErrorText: '',
            endTimeErrorText: '',
        };
    }

    submit = () => {
        console.log('onclick')
        const { date, startTime, endTime } = this.state;
        if (!date || !startTime || !endTime) {
            //Adds text to the errortext states
            date ? this.setState({dateErrorText: ''}) : this.setState({dateErrorText: 'Dato mangler'});
            startTime ? this.setState({startTimeErrorText: ''}) : this.setState({startTimeErrorText: 'Start tid mangler'});
            endTime ? this.setState({endTimeErrorText: ''}) : this.setState({endTimeErrorText: 'Slutt tid mangler'});
        }
    };

    render(){
        console.log(this.state.startTime);
        return (
            <View style={styles.container}>
                <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Hva vil du reservere?</FormLabel>
                <Picker
                    mode="dialog"
                    style={{marginTop: Platform.OS === 'android' ? 0 : -40}}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Bad" value="Bad" />
                    <Picker.Item label="Kjøkken" value="Kjøkken" />
                    <Picker.Item label="Fellesareal" value="Fellesareal" />
                </Picker>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Dato</FormLabel>
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            placeholder="Velg dato"
                            format="YYYY-MM-DD"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => this.setState({ date })}
                            confirmBtnText="Lagre"
                            cancelBtnText="Avbryt"
                        />
                        <FormValidationMessage>{this.state.dateErrorText}</FormValidationMessage>
                    </View>
                    <View style={{flex: 1}} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Start tid</FormLabel>
                        <DatePicker
                            date={this.state.startTime}
                            mode="time"
                            placeholder="Velg start tid"
                            format="HH-MM"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => this.setState({ startTime: date })}
                            confirmBtnText="'Lagre"
                            cancelBtnText="Avbryt"
                        />
                        <FormValidationMessage>{this.state.startTimeErrorText}</FormValidationMessage>
                    </View>
                    <View style={{flex: 1}}>
                        <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Start tid</FormLabel>
                        <DatePicker
                            mode="time"
                            placeholder="Velg slutt tid"
                            format="HH-MM"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => console.log(date)}
                            confirmBtnText="Lagre"
                            cancelBtnText="Avbryt"
                        />
                        <FormValidationMessage>{this.state.endTimeErrorText}</FormValidationMessage>
                    </View>
                </View>
                <View style={{alignItems: 'stretch'}}>
                    <Button
                        borderRadius={5}
                        buttonStyle={styles.buttonStyle}
                        backgroundColor='white'
                        containerViewStyle={styles.buttonContainerStyle}
                        title="Lagre"
                        color="black"
                        textStyle={{fontWeight: 'bold'}}
                        onPress={() => this.submit()}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    labelStyle: {
        fontSize: 14,
        marginBottom: 10,
        color: colors.textColor
    },
    buttonContainerStyle: {
        marginLeft: 8,
        marginRight: 18,
        marginTop: 20,
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: colors.primaryColor
    }
};

export default BookingForm;
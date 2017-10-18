import React, { Component } from 'react';
import {
    Text,
    View,
    Picker,
    Platform,
    DatePickerAndroid
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import colors from '../config/colors'
import DatePicker from 'react-native-datepicker'

class BookingForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            value: ''
        }
        console.log(new Date())
    }



    render(){
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
                            date={new Date()}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => console.log(date)}
                        />
                    </View>
                    <View style={{flex: 1}} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Start tid</FormLabel>
                        <DatePicker
                            date={new Date()}
                            mode="time"
                            placeholder="select date"
                            format="HH-MM"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => console.log(date)}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <FormLabel style={{marginLeft: -12}} labelStyle={styles.labelStyle}>Start tid</FormLabel>
                        <DatePicker
                            date={new Date()}
                            mode="time"
                            placeholder="select date"
                            format="HH-MM"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 8,
                                }
                            }}
                            onDateChange={(date) => console.log(date)}
                        />
                    </View>
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
    }
};

export default BookingForm;
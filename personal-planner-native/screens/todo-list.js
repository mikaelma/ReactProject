import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, CheckBox, List } from 'react-native-elements';
import colors from '../config/colors';

class TodoList extends Component{
    constructor(props){
        super(props)

        this.state = {
            text: '',
            elements: [
                {title: 'Kjøpe mange meloner', checked: false},
                {title: 'Kjøpe mange meloner', checked: false},
                ]
        };
    }

    async componentWillMount(){
        const elements = await AsyncStorage.getItem("elements");
        if (elements){
            console.log("VI HAR DATA");
            this.setState({ elements })
        }else{
            console.log("Ingen data lagret...");
        }
    }

    handleCheck = (index) => {
        let elements = this.state.elements;
        elements[index].checked = !elements[index].checked;
        this.setState({
            elements
        })

    }

    handleText = () => {
        console.log("VI SKREV: " + this.state.text)
        this.setState({
            elements: [...this.state.elements, {title: this.state.text, checked: false}],
            text: '',
        })
    }

    render(){
        let self = this;
        return (
            //View for holding the whole layout
            <View style={{flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', }}>

                <View style={{height: '15%', justifyContent: 'center'}}>

                    <FormInput placeholder="Add new todo" placeholderTextColor={colors.secondaryColor} inputStyle={{color: colors.textColor, textAlign:"center"}} value={this.state.text} onChangeText={(text) => self.setState({text})}
                               onSubmitEditing={ () => self.handleText(this)}/>


                </View>

                <ScrollView style={{height: '85%', width:'100%'}}>
                    <List containerStyle={{marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: colors.white}}>
                        {
                            this.state.elements.map((element, index) => (
                                <CheckBox
                                    key={index}
                                    title={element.title}
                                    checked={element.checked}
                                    uncheckedColor={'#C84630'}
                                    checkedColor={'#5FDD9D'}
                                    onPress={() => self.handleCheck(index)}/>
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
}

export default TodoList;
                /*

                */

import React, { Component } from 'react';
import { View, Text,  ScrollView, AsyncStorage } from 'react-native';
import { FormInput, CheckBox, List } from 'react-native-elements';
import colors from '../config/colors';

class TodoList extends Component{
    constructor(props){
        super(props)

        this.state = {
            text: '',
            elements: [{title: 'heahea', checked: false}, ],
        };
    }

    async componentWillMount(){
        try{
            const elements = await AsyncStorage.getItem('elements');
            if(elements){
                this.setState({
                    elements:JSON.parse(elements)
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    async componentDidUpdate(){
        try{
            await AsyncStorage.setItem('elements',JSON.stringify(this.state.elements));
        } catch (error){
            console.log(error);
        }
    }

    handleCheck = (index) => {
        let elements = this.state.elements;
        elements[index].checked = !elements[index].checked;
        this.setState({
            elements
        });

    }

    handleText = () => {
        this.setState({
            elements: [...this.state.elements, {title: this.state.text, checked: false}],
            text: '',
        })
    }

    deleteElement = (index) => {
        let elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({
            elements
        });
    }

    render(){
        let self = this;
        return (
            //View for holding the whole layout
            <View style={{flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', }}>

                <View style={{height: '15%', justifyContent: 'center'}}>

                    <FormInput placeholder="Add new todo"
                               placeholderTextColor={colors.secondaryColor}
                               inputStyle={{color: colors.textColor, textAlign:"center"}}
                               value={this.state.text}
                               onChangeText={(text) => self.setState({text})}
                               onSubmitEditing={ () => self.handleText(this)}
                               underlineColorAndroid={colors.secondaryColor}/>

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
                                    onPress={() => self.handleCheck(index)}
                                    onIconPress={() => self.handleCheck(index)}
                                    onLongPress={() => self.deleteElement(index)}
                                    onLongIconPress={() => self.deleteElement(index)}/>
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

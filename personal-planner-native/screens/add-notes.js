import React, {Component} from 'react';
import {View,Card,Text,AsyncStorage} from 'react-native';
import {FormInput,FormLabel,Button} from 'react-native-elements';
import colors from '../config/colors';
import ActioButton from 'react-native-action-button'
import {FontAwesome} from '@expo/vector-icons';

class AddNotes extends Component{
    constructor(props){
        super(props);
        this.state = {
            notes:[],
            title:"",
            text:""
        }
    }
    async componentWillMount(){
        try{
            const notes = await AsyncStorage.getItem('elements');
            if(notes){
                this.setState({
                    elements:JSON.parse(notes)
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    removeNote(e,index){
        let notes = this.state.notes;
        notes.splice(index,1);
        this.setState({notes:notes});
    }
    render(){
        let self = this;
        return(
        <View style={{backgroundColor:'#ffffff',flex:1}}>
            <View>
            <FormLabel>Tittel</FormLabel>
            <FormInput hint="Tittel" placeholderTextColor={colors.secondaryColor} inputStyle={{color: colors.textColor, textAlign:"center"}} value={this.state.title} onChangeText={(title) => self.setState({title:title})}
                               onSubmitEditing={ () => self.handleText(this)} underlineColorAndroid={colors.secondaryColor}/>
            </View>
            <View>
                <FormLabel>Notat</FormLabel>
            <FormInput multiline numberOfLines={4} hint="Notat..." placeholderTextColor={colors.secondaryColor} inputStyle={{color: colors.textColor, textAlign:"center"}} value={this.state.text} onChangeText={(text) => self.setState({text:text})}
                               onSubmitEditing={ () => self.handleText(this)} underlineColorAndroid={colors.secondaryColor}/>
            </View>
            <Button
                        borderRadius={5}
                        buttonStyle={styles.buttonStyle}
                        textStyle={{fontWeight: 'bold'}}
                        containerViewStyle={styles.buttonContainerStyle}
                        backgroundColor='white'
                        color="black"
                        title={"Lagre notat"}
                        onPress={() =>{
                             this.props.navigation.state.params.onGoBack({title:this.state.title,text:this.state.text})
                             this.props.navigation.goBack();
                            }
                        }
                    />
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


export default AddNotes;
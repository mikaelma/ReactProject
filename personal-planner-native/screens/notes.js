import React, {Component} from 'react';
import {View,Card,Icon,Text,AsyncStorage,ScrollView} from 'react-native';
import colors from '../config/colors';
import ActionButton from 'react-native-action-button'
import {FontAwesome} from '@expo/vector-icons';

class Notes extends Component{
    constructor(props){
        super(props);
        this.state = {
            notes:[]
        }
    }
    async componentWillMount(){
        try{
            const notes = await AsyncStorage.getItem('note_items');
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
        return (<View style={style.notesStyle}>
        <ScrollView style={{height:'85%'}}>
            {this.state.notes.map((note,index)=>{
                return(
                    <Card style={style.postIt}
                        title={note.title}>
                        <Text>{note.text}</Text>
                        <Icon reverse
                        name="cross"
                        type="font-awesome"
                        color={colors.primaryColor}
                        onPress={(e)=>{
                            self.removeNote(e,index);
                        }}/>
                </Card>)
            })}
        </ScrollView>
        <ActionButton
                    onPress={() => this.props.navigation.navigate('AddNoteView')}
                    buttonColor={colors.primaryColor}
                    icon={(<FontAwesome name="plus" color="white" size={24}/>)}
                />
    </View>)
    }
}

const style = {
    postIt:{
        backgroundColor:"#FFEB3B",
        marginTop:10
    }
}
export default Notes;
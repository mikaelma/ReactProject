import React, {Component} from 'react';
import {View,Text,AsyncStorage,ScrollView} from 'react-native';
import colors from '../config/colors';
import {Card,Icon} from 'react-native-elements'
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
                    notes:JSON.parse(notes)
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    addNote =  (note)=>{
        let self = this
        let notes = this.state.notes;
        notes.push(note);
        this.setState({notes},()=>{
            AsyncStorage.setItem('note_items',JSON.stringify(notes));
        });
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
                    <Card containerStyle={style.container} key ={index} dividerStyle={style.postIt} titleStyle={style.titleStyle} style={style.postIt}
                        title={note.title}>
                        <Text style={style.contentStyle}>{note.text}</Text>
                        <Icon style={{alignSelf:'flex-end',marginRight:10,marginBottom:10}} reverse
                        name="times"
                        type="font-awesome"
                        color={'#FFEB3B'}
                        reverseColor={'black'}
                        
                        onPress={(e)=>{
                            self.removeNote(e,index);
                        }}/>
                </Card>)
            })}
        </ScrollView>
        <ActionButton
                    onPress={() => this.props.navigation.navigate('AddNoteView',{onGoBack:self.addNote})}
                    buttonColor={colors.primaryColor}
                    icon={(<FontAwesome name="plus" color="white" size={24}/>)}
                />
    </View>)
    }
}

const style = {
    notesStyle:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    postIt:{
        backgroundColor:"#FFEB3B",
        marginTop:10,
        width:'85%',
        alignSelf:'center',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0
    },
    container:{
        width:'85%',
        alignSelf:'center',
        backgroundColor:'red',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0
    },
    titleStyle:{
        fontSize:18,
        alignSelf:'flex-start',
        marginTop:5,
        marginLeft:5
    
    },
    contentStyle:{
        marginLeft:5
    }
}
export default Notes;
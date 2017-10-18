import React from 'react';
import { Platform } from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Calendar, Profile, TodoList, BookingForm,Notes,AddNotes} from '../screens';
import { FontAwesome } from '@expo/vector-icons';
import colors from './colors';

/**
 * Main navigator. Tabnavigator at the bottom with all different screens
 */
export const MainTabs = TabNavigator({
    //Calendar Screen
    Calendar: {
        //Stacknavigator inside so we get prestyled header
        screen: StackNavigator({
            //First view in stacknavigator
            CalendarView: {
                //Calendar screen
                screen: Calendar,
                //Styling for the header
                navigationOptions: {
                    headerTitleStyle: {
                        color: colors.white,
                        fontSize: 30,
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                        marginTop: Platform.OS === 'android' ? 24 : 0,
                    },
                    title: 'Agenda'
                }
            },
            BookingForm: {
                screen: BookingForm,
                navigationOptions: {
                    headerTitleStyle: {
                        color: colors.white,
                        fontSize: 30,
                    },
                    headerTintColor: 'white',
                    headerBackTitleStyle: {
                        fontSize: 24
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                        marginTop: Platform.OS === 'android' ? 24 : 0,
                    },
                    title: 'Reservasjon'
                }
            }
        }, {
            headerMode: 'float'
        }),
        //Styling for the chosen element in the tabnavigator
        navigationOptions: {
            title: 'Kalender',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="calendar" size={26} color={tintColor}/>
            )
        }
    },
    //TodoList screen
    TodoList: {
        //Stacknavigator inside so we get prestyled header
        screen: StackNavigator({
            TodoListView: {
                screen: TodoList,
                //Styling for the header
                navigationOptions: {
                    headerTitleStyle: {
                        color: colors.white,
                        fontSize: 30,
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                        marginTop: Platform.OS === 'android' ? 24 : 0,
                    },
                    title: 'Todo'
                }
            }
        }),
        //Styling/options for the chosen element in the tabnavigator
        navigationOptions: {
            title: 'Todo-liste',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="th-list" size={26} color={tintColor}/>
            )
        }
    },
    //Profile screen
    Profile: {
        //Stacknavigator inside so we get prestyled header
        screen: StackNavigator({
            ProfileView: {
                screen: Profile,
                //Styling for the header
                navigationOptions: {
                    headerTitleStyle: {
                        color: colors.white,
                        fontSize: 30,
                    },
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                        marginTop: Platform.OS === 'android' ? 24 : 0
                    },
                    title: 'Profil'
                }
            }
        }),
        //Styling for the chosen element in the tabnavigator
        navigationOptions: {
            title: 'Profil',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="user-circle" size={26} color={tintColor}/>
            )
        }
    },
    Notes:{
     screen: StackNavigator({   
         NotesView:{
             screen:Notes,
             navigationOptions:{
                 headerTitleStyle:{
                     color:colors.white,
                     fontSize:30,
                 },
                 headerStyle:{
                     backgroundColor:colors.primaryColor,
                     marginTop:Platform.OS === 'android' ? 24: 0
                 },
                 title:'Notater'
             }
         },AddNoteView:{
             screen:AddNotes,
             navigationOptions:{
                headerTitleStyle:{
                    color:colors.white,
                    fontSize:30,
                },
                headerTintColor: 'white',
                headerBackTitleStyle: {
                    fontSize: 24
                },
                headerStyle:{
                    backgroundColor:colors.primaryColor,
                    marginTop:Platform.OS === 'android' ? 24: 0
                },
                title:'Notater'
             }
         }
     },{
        navigationOptions: {
            title: 'Notater',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="sticky-note-o" size={26} color={tintColor}/>
            )
        }
     })   
    }
    }, {
    //All options for the bottom navigator/tabnavigator
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: true,
    lazy: false,
    tabBarOptions: {
        style:{
            backgroundColor: colors.white,
        },
        activeTintColor: colors.primaryColor,
        inactiveTingColor: colors.idleColor,
    },
});
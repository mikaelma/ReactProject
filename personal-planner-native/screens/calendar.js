import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Keyboard
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import colors from '../config/colors';
import ActionButton from 'react-native-action-button';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

Keyboard.dismiss();

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: {

            }
        }
    }

    async componentWillMount(){
        AsyncStorage.getItem('somekey')
            .then(req => JSON.parse(req))
            .then(json => this.setState({ items: json.items }))
            .catch(error => console.log('errorGet!'));
    }

    storeAgenda = (date, startTime, endTime, value) => {
        console.log(value);
        const day = {
            timestamp: new Date().getTime(),
            date: date,
            start: startTime,
            end: endTime,
            room: value
        };
        this.loadItems(day);
    };

    /**
     * Render method to render the agenda calendar with an action button at the end to add new agenda items
     * @returns {XML}
     */
    render() {
        return (
            <View style={{flex:1}}>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={new Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    theme={{
                        selectedDayBackgroundColor: colors.secondaryColor,
                        todayTextColor: colors.primaryColor,
                        dotColor: colors.primaryColor,
                        monthTextColor: colors.secondaryColor,
                    }}
                />
                <ActionButton
                    onPress={() => this.props.navigation.navigate('BookingForm', {onGoBack: this.storeAgenda})}
                    buttonColor={colors.primaryColor}
                    icon={(<FontAwesome name="plus" color="white" size={24}/>)}
                />
            </View>
        );
    }

    /**
     * Loads items to fill the agenda.
     * @param day
     */
    async loadItems(day) {
        await setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                }
            }
            //console.log(this.state.items);
            let newItems = {};
            if (day.date){
                newItems = {
                    items: this.state.items[day.date].push({
                        room: day.room,
                        start: day.start,
                        end: day.end
                    })
                };
            }
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            }, () => {
                AsyncStorage.setItem('somekey', JSON.stringify(this.state))
                    .then(json => console.log('success!'))
                    .catch(error => console.log('errorSet!'));
            });
        }, 1000);
    }

    /**
     * If Loaditems find an item it gets rendered with this styling
     * @param item
     * @returns {XML}
     */
    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text>
                {`${item.room} er reservert fra ${item.start} - ${item.end}`}
                </Text>
            </View>
        );
    }

    /**
     * If no agenda items at a certain date this method returns the view for empty date
     * @returns {XML}
     */
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Ingen reservasjoner</Text></View>
        );
    }

    /**
     * Method to change agenda row. This happens when you change a week in the agenda
     * @param r1
     * @param r2
     * @returns {boolean}
     */
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    /**
     * Converts date object to string because the Agenda component are using strings and not Date
     * @param time
     * @returns {*}
     */
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height: 15
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});

export default Calendar;
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import colors from '../config/colors';
import ActionButton from 'react-native-action-button';
import { FontAwesome } from '@expo/vector-icons';

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: {
                '2017-10-19': [{name: 'item 1 - any js object'}]}
        }
    }

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
                    onPress={() => this.props.navigation.navigate('AddNoteView')}
                    buttonColor={colors.primaryColor}
                    icon={(<FontAwesome name="plus" color="white" size={24}/>)}
                />
            </View>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Ingen reservasjoner</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        console.log(date);
        console.log(date.toISOString().split('T')[0])
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
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});

export default Calendar;
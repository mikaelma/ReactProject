import React, {Component} from 'react';
import {RaisedButton, Dialog, DropDownMenu, MenuItem, FlatButton} from 'material-ui';
import { DateForm, TimePickerForm } from '../components/form';
import ToDoContainer from '../components/containers/todo-container';
import NotesContainer from '../components/containers/notes-container';
import CalendarContainer from '../components/containers/calendar-container';
import Calendar from '../components/calendar/calendar';
import moment from 'moment';
import 'moment/locale/nb';
import TodoList from '../components/lists/todo-list';
import NoteList from '../components/lists/note-list';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: 'Bad',
            startTime: null,
            endTime: null,
            date: null,
            desktop: window.innerWidth < 700 ? false : true,
            events: [],
            dateErrorText: '',
            startTimeErrorText: '',
            endTimeErrorText: '',
            name: ''
        };

        //Listener for window size
        const mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(this.WidthChange);
    }

    /**
     * Fetches events from localstorage and adds them to state before the component is rendered
     * @returns {Promise.<void>}
     */
    async componentWillMount(){
        let events = await JSON.parse(localStorage.getItem("events"));
        let userInformation = await JSON.parse(localStorage.getItem("info"));
        if (events){
            //Converts date strings to date object
            events.map((e) => {
                e.start = moment(e.start).toDate();
                e.end = moment(e.end).toDate();
                return null;
            });
            this.setState({ events })
        }
        userInformation ?
            this.setState({ name: userInformation.firstnameField + ' ' + userInformation.surnameField}) :
            this.setState({ name: '' });
    }

    /**
     * Listens to window resize. If smaller than 700px sets state to not desktop
     * @param mq
     * @constructor
     */
    WidthChange = (mq) => {
        if (mq.matches) {
            this.setState({desktop: true})
        } else {
            this.setState({desktop: false})
        }
    };

    /**
     * Handle change when dropdown button in modal changes values
     * @param event
     * @param index
     * @param value
     */
    handleChange = (event, index, value) => this.setState({value});

    /**
     * Formats the date shown in datepicker component
     * @param date
     * @returns {string}
     */
    formatDate(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    /**
     * Resets all form fields when dialog closes.
     */
    handleClose = () => {
        this.setState({
            dateErrorText: '',
            startTimeErrorText: '',
            endTimeErrorText: '',
            open: false,
            date: null,
            startTime: null,
            endTime: null
        })
    };

    /**
     * Stores the booking done in the calendar. First checks if some fields are empty and displays errrortext if they are.
     * Also checks if endtime is before start time
     * If everything is filled correctly adds the new event to state and stores the whole array in localstorage
     * @returns {Promise.<void>}
     */
    saveBooking = () => {
        const { date, startTime, endTime, name, value } = this.state;
        //If no information in the form elements
        if (!date || !startTime || !endTime){
            //Adds text to the errortext states
            date ? this.setState({ dateErrorText: ''}) : this.setState({ dateErrorText: 'Dato mangler' });
            startTime ? this.setState({ startTimeErrorText: ''}) : this.setState({ startTimeErrorText: 'Start tid mangler' });
            endTime ? this.setState({ endTimeErrorText: ''}) : this.setState({ endTimeErrorText: 'Slutt tid mangler' });
            return;
        //If end time is before start time
        } if (moment(endTime).isBefore(moment(startTime))){
            //Sets errortext to state
            return this.setState({  dateErrorText: '', startTimeErrorText: '', endTimeErrorText: 'Slutt tid er før Start tid'});
        //If everything is filled correctly
        } else {
            this.setState({
                events: [...this.state.events, {'title': name ? `${value} - ${name}` : value,
                    'start': new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTime.getHours(), startTime.getMinutes()),
                    'end': new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime.getHours(), startTime.getMinutes())}],
            }, () => {
                localStorage.setItem("events", JSON.stringify(this.state.events));
                this.handleClose();
            });
        }
    };

    render(){
        return (
            <div style={style.mainStyle}>
                <div style={{display: 'flex', flex: 1, flexDirection: this.state.desktop ? 'row' : 'column'}}>
                    <ToDoContainer>
                        <h1 style={style.h1}>Todo</h1>
                        <TodoList />
                    </ToDoContainer>
                    <NotesContainer>
                        <h1 style={style.h1}>Notater</h1>
                        <NoteList/>
                    </NotesContainer>
                    <CalendarContainer>
                        <h1 style={style.h1}>Reservasjoner</h1>
                        <RaisedButton label="Ny Reservasjon" primary={true} style={{marginTop: 10, marginLeft: 10}}
                                      onClick={() => this.setState({open: true})}/>
                        <Calendar events={this.state.events}/>
                    </CalendarContainer>

                </div>
                <Dialog
                    title="Reservasjon"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        Hva vil du reservere?
                        <DropDownMenu value={this.state.value} style={style.dropDownMenuStyle}
                                      onChange={this.handleChange}>
                            <MenuItem value={'Bad'} primaryText="Bad"/>
                            <MenuItem value={'Kjøkken'} primaryText="Kjøkken"/>
                            <MenuItem value={'Fellesareal'} primaryText="Fellesareal"/>
                        </DropDownMenu>
                        <div style={{
                            display: 'flex',
                            flexDirection: this.state.desktop ? 'row' : 'column',
                            flex: 1,
                            flexFlow: 'row-wrap',
                        }}>
                            <DateForm
                                title="Dato"
                                date={this.state.date}
                                placeholder="Velg dato"
                                formatDate={this.formatDate}
                                setDate={(date) => this.setState({date})}
                                width={155}
                                marginRight={10}
                                errorText={this.state.dateErrorText}
                            />
                            <TimePickerForm
                                title="Start"
                                placeholder="Start tidspunkt"
                                setTime={(time) => this.setState({startTime: time})}
                                width={155}
                                marginLeft={10}
                                marginRight={10}
                                errorText={this.state.startTimeErrorText}
                            />
                            <TimePickerForm
                                title="Slutt"
                                placeholder="Slutt tidspunkt"
                                setTime={(time) => this.setState({endTime: time})}
                                width={155}
                                marginLeft={10}
                                marginRight={0}
                                errorText={this.state.endTimeErrorText}
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', flex: 1, marginTop: 5}}>
                            <RaisedButton label="Fullfør" primary={true} style={{marginRight: 10}}
                                          onClick={this.saveBooking}/>
                            <FlatButton label="Avbryt" secondary={true} onClick={this.handleClose}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const style = {
    mainStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 20,
    },
    dropDownMenuStyle: {
        marginLeft: -23,
        width: 200,
        marginBottom: 10
    },
    h1: {
        fontFamily: 'Roboto',
        fontWeight: '100',
        
    }
};

export default MainPage;
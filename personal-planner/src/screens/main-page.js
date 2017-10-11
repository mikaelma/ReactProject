import React, {Component} from 'react';
import {AppBar, RaisedButton, Dialog, DropDownMenu, MenuItem, TimePicker, FlatButton} from 'material-ui';
import DateForm from '../components/form/date-picker';
import TimePickerForm from '../components/form/time-picker';
import MainContainer from '../components/containers/main-container';
import Calendar from '../components/calendar/calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import 'moment/locale/nb';

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
        };

        //Listener for window size
        const mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(this.WidthChange);
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
     * Opens Dialog
     */
    handleOpen = () => {
        this.setState({open: true});
    };

    /**
     * Closes Dialog
     */
    handleClose = () => {
        this.setState({open: false});
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

    saveBooking = () => {
        console.log(this.state.date, this.state.startTime, this.state.endTime)
    };

    render() {
        return (
            <div style={style.mainStyle}>
                <AppBar
                    title='kollektiv rombooking'
                    showMenuIconButton={false}
                    iconClassNameRight="fa fa-user"
                />
                <div style={{display: 'flex', flex: 1, flexDirection: this.state.desktop ? 'row' : 'column'}}>
                    <MainContainer>
                        <Calendar />
                        <RaisedButton label="Ny Reservasjon" primary={true} style={{marginTop: 10, marginLeft: 10}}
                                      onClick={this.handleOpen}/>
                    </MainContainer>
                    <MainContainer>
                        TODOLIST
                    </MainContainer>
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
                            />
                            <TimePickerForm
                                title="Start"
                                placeholder="Start tidspunkt"
                                setTime={(time) => this.setState({startTime: time})}
                                width={155}
                                marginLeft={10}
                                marginRight={10}
                            />
                            <TimePickerForm
                                title="Slutt"
                                placeholder="Slutt tidspunkt"
                                setTime={(time) => this.setState({endTime: time})}
                                width={155}
                                marginLeft={10}
                                marginRight={0}
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
        flex: 1
    },
    dropDownMenuStyle: {
        marginLeft: -23,
        width: 200,
        marginBottom: 10
    }
};

export default MainPage;
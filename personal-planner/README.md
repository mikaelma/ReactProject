# Description

This is a react web app created for the NTNU course IT2810 - Webutvikling, by group 34.

We got the idea for this application from a friend who told us that her student
housing desperately needed an app for administrating the usage of their bathroom
and other facities in their house. As it is today, if someone has a lecture at the
same time in the morning the bathroom is naturally occupied and sometimes there is 
no time to shower. 

She wanted an application where all students in the house could book the different
facilites based on when they start and end school. This way it would be much easier
to plan dinner, showers and even parties.

To solve this we have created the basics of an application called __Kollektivet__ where you are met with a page that
displays a todo-list, notes, and a calendar with room bookings.

Since the idea is that this application later on will be online we have created a profile page
so the people living under the same roof can edit their profile and customize their user experience.

# Installation

To run the project do the following:
1. cd into (./personal-planner)
2. run npm install

if you get errors:
- make sure you do not have a (./node_modules) folder.
- if the error is concerning the moments library: npm install moment@2.19.1
3. run npm start

# Code Examle

All __screens__ in the project can be found in the [screens folder](./src/sreens/). 

Screens will hold and render different __components__, found in [components folder](./src/components/).

The first thing the application does is to send you to the [Main page](./src/screens/main-page.js)

Here you can see our main components; the [Todo list](./src/components/lists/todo-list.js),
the [Notes](./src/components/form/note-form.js), 
and the [Calendar](./src/components/calendar/calendar.js)

The main page is created with flex-containers to place the components:

'''javascript
render(){
        return (
            <div style={style.mainStyle}>
                <div style={{display: 'flex', flex: 1, flexDirection: this.state.desktop ? 'row' : 'column'}}>
                    <ToDoContainer>
                        <TodoList />
                    </ToDoContainer>
                    <CalendarContainer>
                        <Calendar events={this.state.events}/>
                        <RaisedButton label="Ny Reservasjon" primary={true} style={{marginTop: 10, marginLeft: 10}}
                                      onClick={() => this.setState({open: true})}/>
                    </CalendarContainer>

                </div>
                ..............
'''

It also handles collecting data for the calendar from local storage and mapping them to the calendar component: 

'''javascript
async componentWillMount(){
        let events = await JSON.parse(localStorage.getItem("events"));
        let userInformation = await JSON.parse(localStorage.getItem("info"));
        if (events){
            //Converts date strings to date object
            events.map((e) => {
                e.start = moment(e.start).toDate();
                e.end = moment(e.end).toDate();
            });
            this.setState({ events })
        }
        userInformation ?
            this.setState({ name: userInformation.firstnameField + ' ' + userInformation.surnameField}) :
            this.setState({ name: '' });
    }
'''

The same goes for saving to local storage:
'''javascript
saveBooking = () => {
        const { date, startTime, endTime, events, name, value } = this.state;
        //If no information in the form elements
        if (!date || !startTime || !endTime){
        ..................
'''


# Styling

For styling this project we have mainly used the theme 
included in [Material UI](http://www.material-ui.com/#/).

Since this has included most of the visual styling we need, the remaing need for .CSS has been covered by direct styling in the script:
'''javascript
<div style={style.containerStyle}>

const style = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',

        width: '100%',
        height: '100%',
      },
  }
'''

We did this to avoid having a .css file for every component and screen, and also this is a perfectly ok way to do it with React, and it makes porting to React native much easier.

# Packages used

'''json
"dependencies": {
    "jscs": "^3.0.7",
    "material-ui": "^0.19.3",
    "moment": "2.19.1",
    "react": "^16.0.0",
    "react-big-calendar": "^0.16.1",
    "react-dom": "^16.0.0",
    "react-image": "^1.0.1",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.0.14",
    "react-validation": "^3.0.6"
  }
'''
- jscs: is a standard library used for styling the code, we did not use this much however.
- maetrial-ui: is a library containing a lot of great components, fully functional and styled. It is also used for themeing the page.
- moment: Usaful library for formatting date-objects, used in calendar.
- react-big-calendar: The calendar we use.

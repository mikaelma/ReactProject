# Description

This is a react native app created for the NTNU course IT2810 - Webutvikling, by group 34.

To read the intensions and idea behind this project, please navigate to the [web app](../personal-planner/).

This application is a port of our web app created with React Native for iOS and Android.

# Installation

To run the project do the following:
1. cd into "./personal-planner-native"
2. run "npm install"
3. run "npm start"

For testing purposes we recommend using the app [__Expo__](https://expo.io).

4. scan the QR code shown in the terminal window with the Expo application

# Code Examle

All __screens__ in the project can be found in the [screens folder](./screens/). 

Screens will hold and render different __components__. For this app we have used components from [React Native UI](https://facebook.github.io/react-native/docs/native-components-ios.html) and a library called [React Native Elements](https://react-native-training.github.io/react-native-elements/). Most of our components come from the latter since they are styled and fully functional. We chose this approach since the components are really good looking and styling all components takes a lot of work.

To __navigate__ the app we use the "tab navigator" component from React Native Navigation, located in [routes.js](./config/routes.js). The following code will add a button on the navigation bar on the bottom of the screen, place a header on top, and give the screen an icon:

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

The tab navigator takes in the Calendar object, which used a stack navigator to display the calendarview. Navigation Options styles the navigation components.

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

You can find the same components from the web app in this application, but as different screens:
[Calendar](./screens/calendar.js)
[Todo List](./screens/todo-list.js)
[Notes](./screens/notes.js)
[Profile](./screens/profile.js)

To load data from local storage we use __AsyncStorage__, this gives us almost identical functionality as __local storage__ from the web application. 

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

We use the function componentWillMount() to gather the data since the method is called before the screen is rendered.
Likely, we use componendDidUpdate() to save the data, since this method is called after the component is updated.

    async componentDidUpdate(){
            try{
                await AsyncStorage.setItem('elements',JSON.stringify(this.state.elements));
            } catch (error){
                console.log(error);
            }
        }

# Styling

For styling this application we have mostly used direct styling on the elements to either change color or margin. It has not been necessary to create .css for each screen since the styling is very limited. We have however created a [config-file](./config/colors.js) for holding the colors we use across all screens.

# Packages used


    "dependencies": {
      "expo": "^21.0.2",
      "react": "^16.0.0-alpha.12",
      "react-native": "^0.48.4",
      "react-native-action-button": "^2.8.0",
      "react-native-calendars": "^1.7.1",
      "react-native-datepicker": "^1.6.0",
      "react-native-elements": "^0.17.0",
      "react-navigation": "^1.0.0-beta.13"
    }

- expo: is used for developing the app and testing it "on the go".
- react-action-button: the button we use to add new elements to the calendar.
- react-native-calendars: the calendar
- react-native-datepicker: used for picking the correct date for the calendar.
- react-native-elements: finished components used in the application

# Creators

Hans Brenna
Sondre Løvhaug
Matz Leander Wiik
Mikael Mathisen
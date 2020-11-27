import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import HomeStack from '../navigation/HomeNavigator'

import { connect } from 'react-redux'

import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'

const Stack = createStackNavigator();

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <NavigationContainer>
                    <Stack.Navigator>
                        {this.props.isLoading ? (
                            // We haven't finished checking for the token yet
                            <Stack.Screen name="Splash" component={SplashScreen} />
                        ) : this.props.userToken == null ? (
                            // No token found, user isn't signed in
                            <Stack.Screen
                                name="Home"
                                component={HomeStack}
                                options={{
                                    headerShown: false,
                                    headerMode: 'none'
                                }}
                            />
                        ) : (
                                    // User is signed in
                                    <Stack.Screen name="Root" component={BottomTabNavigator}                                 
                                    options={{
                                        headerShown: false,
                                        headerMode: 'none'
                                    }}/>
                                )}
                    </Stack.Navigator>
                </NavigationContainer>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(AppComponent)
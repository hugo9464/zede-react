import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

import { connect } from 'react-redux'

import SignInPage from './SignInPage'

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
        console.log("constructor APP: ")
        console.log(this.props.userToken)
    }

    componentDidUpdate() {
        console.log("componentDidUpdate APP: ")
        console.log(this.props.userToken)
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
                                name="SignIn"
                                component={SignInPage}
                                options={{
                                    title: 'Sign in',
                                    // When logging out, a pop animation feels intuitive
                                    animationTypeForReplace: this.props.isSignout ? 'pop' : 'push',
                                }}
                            />
                        ) : (
                                    // User is signed in
                                    <Stack.Screen name="Root" component={BottomTabNavigator} />
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
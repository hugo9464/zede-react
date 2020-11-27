import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux'

import SignInPage from '../components/SignInPage'
import SignUpPage from '../components/SignUpPage'

const Stack = createStackNavigator();

class HomeStack extends React.Component {

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInPage}
            options={{
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: this.props.isSignout ? 'pop' : 'push',
              headerShown: false,
              headerMode: 'none'
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpPage}
            options={{
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: this.props.isSignout ? 'pop' : 'push',
              headerShown: false,
              headerMode: 'none'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

};

const mapStateToProps = (state) => {
  return {
      userToken: state.userToken
  }
}

export default connect(mapStateToProps)(HomeStack)
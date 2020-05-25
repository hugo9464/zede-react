import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'

class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: ""
         };
    }

    signIn() {
        console.log(this.state.username)
        const action = { type: "SIGN_IN", value: "dummy-auth-token" }
        this.props.dispatch(action)
        console.log(this.props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput 
                    style={styles.textinput} 
                    placeholder='Email'
                    onChangeText={(text) => this.setState({ username: text})} />
                <TextInput 
                    style={styles.textinput} 
                    placeholder='Mot de passe'
                    onChangeText={(text) => this.setState({ password: text})} />
                <Button style={styles.button} title='Connexion' onPress={() => this.signIn()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
    },
    textinput: {
    },
    button: {
    }
  })

  const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
  }

export default connect(mapStateToProps)(SignInPage)
import React from 'react'
import { StyleSheet, View, TextInput, Image, Text, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// import { Button } from 'react-native-material-ui';

import { login } from '../services/user.service'
import { withTheme } from 'styled-components';

import ZedeButton from './custom/ZedeButton'


class SignInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "test@zede.com",
            password: "azerty"
        };
    }

    signIn() {
        login(this.state.username, this.state.password).then((authToken) => {
            const action = { type: "SIGN_IN", value: authToken }
            this.props.dispatch(action)
        });
    }

    render() {

        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo_zede.png')} />

                <Text style={styles.text}>
                    Content de vous revoir !
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Email'
                        placeholderTextColor="#000"
                        autoCompleteType='email'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        onChangeText={(text) => this.setState({ username: text })} />
                    <TextInput
                        style={styles.textinput}
                        placeholder='Mot de passe'
                        placeholderTextColor="#000"
                        autoCompleteType='password'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(text) => this.setState({ password: text })} />
                </View>

                <ZedeButton
                    title='JE ME CONNECTE'
                    onPress={() => this.signIn()} />
                <Text
                    style={styles.createAccountText}
                    onPress={() => this.props.navigation.navigate('SignUp')}>
                    Créer un compte</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '30%'
    },
    logo: {
        width: 80,
        height: 90
    },
    text: {
        fontSize: 32,
        width: '80%',
        textAlign: 'center',
        fontFamily: 'VentiCF-Ultra'
    },
    inputContainer: {
        width: '80%'
    },
    textinput: {
        height: 50,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderColor: '#54e48c',
        borderRadius: 6,
        fontSize: 14,
        marginBottom: 15,
        fontFamily: 'VentiCF-Medium'
    },
    button: {
        backgroundColor: '#68a0cf',
        overflow: 'hidden'
    },
    buttonBorder: {
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#54e48c'
    },
    createAccountText: {
        textDecorationLine: 'underline',
        fontFamily: 'VentiCF-Medium',
        fontSize: 15
    }
})

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(SignInPage)
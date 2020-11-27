import React from 'react'
import { StyleSheet, View, TextInput, Image, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import { connect } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { signup, login } from '../services/user.service'
import { withTheme } from 'styled-components';

import ZedeButton from './custom/ZedeButton'
import { User } from '../models/user'

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "test@zede.com",
            firstName: '',
            lastName: '',
            password: "azerty",
            confirmPassword: ''
        };
    }

    signUp() {
        if (this.state.password !== this.state.confirmPassword) {
            console.log("mots de passe pas identiques")
        } else {
            const user = new User(this.state.email, this.state.firstName, this.state.lastName, this.state.password)
            signup(user).then((response) => {
                if (response.status === 200) {
                    login(this.state.email, this.state.password).then((authToken) => {
                        const action = { type: "SIGN_IN", value: authToken }
                        this.props.dispatch(action)
                    });
                }

            })
        }

    }
    

    render() {

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo_zede.png')} />
                <Text style={styles.text}>
                    Prêt à rejoindre le défi Zéro Déchet ?
                </Text>
                <TextInput
                    style={styles.textinput}
                    placeholder='Prénom'
                    placeholderTextColor="#000"
                    onChangeText={(text) => this.setState({ firstName: text })} />
                <TextInput
                    style={styles.textinput}
                    placeholder='Nom'
                    placeholderTextColor="#000"
                    onChangeText={(text) => this.setState({ lastName: text })} />
                <TextInput
                    style={styles.textinput}
                    placeholder='Email'
                    placeholderTextColor="#000"
                    autoCompleteType='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ email: text })} />
                <TextInput
                    style={styles.textinput}
                    placeholder='Mot de passe'
                    placeholderTextColor="#000"
                    autoCompleteType='password'
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => this.setState({ password: text })} />
                <TextInput
                    style={styles.textinput}
                    placeholder='Confirmation de mot de passe'
                    placeholderTextColor="#000"
                    autoCompleteType='password'
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => this.setState({ confirmPassword: text })} />
                <ZedeButton
                    title="JE M'INSCRIS"
                    onPress={() => this.signUp()} />
                <Text
                    style={styles.backToSigninText}
                    onPress={() => this.props.navigation.navigate('SignIn')}>
                    J'ai déjà un compte</Text>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    innerContainer: {
        paddingTop: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    text: {
        fontSize: 32,
        width: '80%',
        textAlign: 'center',
        fontFamily: 'VentiCF-Ultra'
    },
    textinput: {
        width: '80%',
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
    backToSigninText: {
        textDecorationLine: 'underline',
        fontFamily: 'VentiCF-Medium',
        fontSize: 15,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 70,
        resizeMode: 'contain',
        marginBottom: 20,
        padding: 10,
        marginTop: 20
    },
    register: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    }
})

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(SignUpPage)
import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

class Login extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Email' />
                <TextInput style={styles.textinput} placeholder='Mot de passe' />
                <Button style={styles.button} title='Connexion' onPress={() => { }} />
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

export default Login
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class ZedeButton extends React.Component {
    render() {
        const { onPress, title } = this.props;

        return (
            <TouchableOpacity
                style={styles.submit}
                onPress={onPress}
                underlayColor='#fff'>
                <Text style={styles.submitText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    submit: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#54e48c',
        borderRadius: 30,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'VentiCF-Bold'
    }
})

export default ZedeButton
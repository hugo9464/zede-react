import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class WeighingItem extends React.Component {
    render() {

        const weighing = this.props.weighing

        return (
            <View style={[styles.main_container, weighing.type === 'BLUE' ? styles.brownLine : styles.greenLine]}>
                <Text style={styles.title_text}>{weighing.type}</Text>
                <Text style={styles.title_text}>{weighing.weight}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    brownLine: {
        backgroundColor: 'brown'
    },
    greenLine: {
        backgroundColor: 'green'
    }
})

export default WeighingItem
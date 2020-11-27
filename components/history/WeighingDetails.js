import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

class WeighingDetails extends React.Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.date}>{this.props.weighingDate}</Text>
                <Text style={styles.total}>{this.props.totalWeight} kg</Text>
                <View style={styles.weightDetails}>
                    <View style={styles.weightContainer}>
                        <Text style={styles.type}>TOUT-VENANT</Text><Text style={styles.weight}>{this.props.blueWeight} kg</Text>
                    </View>
                    <View style={styles.weightContainer}>
                        <Text style={styles.type}>RECYCLAGE</Text><Text style={styles.weight}>{this.props.yellowWeight} kg</Text>
                    </View>
                    <View style={styles.weightContainer}>
                        <Text style={styles.type}>VERRE</Text><Text style={styles.weight}>{this.props.greenWeight} kg</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.handleBackToChart()}
                    >
                    <Text style={styles.backText}>Retour au graphique</Text>
                </TouchableOpacity>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    date: {
        fontFamily: 'VentiCF-Ultra',
        fontSize: 25,
        marginTop: 10
    },
    total: {
        fontFamily: 'VentiCF-Thin',
        fontSize: 42
    },
    type: {
        fontFamily: 'VentiCF-Bold',
        fontSize: 15
    },
    weight: {
        fontFamily: 'VentiCF-Medium',
        fontSize: 15,
        marginLeft: 50
    },
    weightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backText: {
        fontFamily: 'VentiCF-Medium',
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})

export default WeighingDetails
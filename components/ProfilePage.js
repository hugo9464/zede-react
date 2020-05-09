import React from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'

import WeighingItem from './Weighingitem'
import WeightPicker from './WeightPicker'

import { getWeighings } from '../services/weighing.service'

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        console.log("logout")
    }

    render() {

        return (
            <View style={styles.main_container}>
                <Button title="Se déconnecter" onPress={() => this.logout()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})

export default ProfilePage
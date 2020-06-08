import React from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { connect } from 'react-redux'


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        const action = { type: "SIGN_OUT"}
        this.props.dispatch(action)
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

export default connect(null)(ProfilePage)
import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Card } from 'react-native-material-ui';

import { connect } from 'react-redux'
import { getSummary } from '../services/weighing.service'


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: [],
        };
    }

    logout() {
        const action = { type: "SIGN_OUT" }
        this.props.dispatch(action)
    }

    componentDidMount() {
        // getSummary(this.props.userToken).then((summaryResponse) => {
        //     console.log(summaryResponse)
        //     this.setState({ summary: summaryResponse })
        // });
    }

    render() {

        return (
            <View style={styles.main_container}>
                <View>
                    <Text>
                        Résumé de mes pesées
                    </Text>
                    <View style={styles.weighings_cards}>
                        <Card>
                            <Text>Ménagère</Text>
                            <Text>13 kg</Text>
                        </Card>
                        <Card>
                            <Text>Verre</Text>
                            <Text>23 kg</Text>
                        </Card>
                        <Card>
                            <Text>Recyclage</Text>
                            <Text>8 kg</Text>
                        </Card>
                    </View>

                </View>
                <View style={styles.logout_button}>
                    <Button title="Se déconnecter" onPress={() => this.logout()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: "100%",
        justifyContent: "space-between",
    },
    weighings_cards: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    logout_button: {
    }
})

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}


export default connect(mapStateToProps)(ProfilePage)
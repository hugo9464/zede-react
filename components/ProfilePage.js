import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Card } from 'react-native-material-ui';

import { connect } from 'react-redux'
import { getSummary } from '../services/weighing.service'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryStack, VictoryZoomContainer } from "victory-native";


class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summaryData: [''],
        };
    }

    logout() {
        const action = { type: "SIGN_OUT" }
        this.props.dispatch(action)
    }

    componentDidMount() {
        getSummary(this.props.userToken).then((summaryResponse) => {
            this.addDataSummary(summaryResponse.BLUE, "Ménagère")
            this.addDataSummary(summaryResponse.GREEN, "Verre")
            console.log(this.state.summaryData)

        });
    }

    addDataSummary(summary, weighingType) {
        const newSummary = { x: weighingType, y: summary.total} 
        this.setState(prevState => ({
            summaryData: [...prevState.summaryData, newSummary]
          }))
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
                <VictoryBar
                    data={this.state.summaryData}
                    labels={({ datum }) => datum.x}
                />
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
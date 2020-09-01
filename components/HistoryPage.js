import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryStack, VictoryZoomContainer } from "victory-native";
import { connect } from 'react-redux'

import { getOverview } from '../services/weighing.service'

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

class HistoryPage extends React.Component {

    constructor(props) {
        super(props);
        var emptyData = []
        this.state = {
            brownData: [],
            greenData: []
        };
    }


    componentDidMount() {
        getOverview(this.props.userToken).then((overviewResponse) => {
            console.log("got frequencies successfully")

            // this.computeFrequencies(overviewResponse.frequencies)
            this.buildFrequencies(overviewResponse.frequencies)


        });
    }

    buildFrequencies(responseFrequencies) {
        const brownFrequencies = this.mapFrequencies(responseFrequencies.BLUE)
        const greenFrequencies = this.mapFrequencies(responseFrequencies.GREEN)

        const firstDate = this.getFirstDate(brownFrequencies[0].x, greenFrequencies[0].x)

        this.setState({
            greenData: this.buildDataFrequency(greenFrequencies, firstDate),
            brownData: this.buildDataFrequency(brownFrequencies, firstDate)

        })
    }

    buildDataFrequency(frequencies, firstDate) {
        if (frequencies[0].x !== firstDate) {
            frequencies.unshift({ x: firstDate, y: null })
        }

        frequencies.forEach(frequency => {
            const dateAsString = frequency.x.getDate() + "\n" + monthNames[frequency.x.getMonth()]
            const index = frequencies.indexOf(frequency)
            frequency = { x: frequency.x, y: frequency.y }
            frequencies[index] = frequency
        })
        return frequencies
    }

    getFirstDate(brownFirstDate, greenFirstDate) {
        if (brownFirstDate < greenFirstDate) {
            return brownFirstDate
        } else {
            return greenFirstDate
        }
    }

    mapFrequencies(rawFrequencies) {
        const weighingDates = Object.keys(rawFrequencies)
        const weighings = Object.values(rawFrequencies)
        var frequencies = []

        var i
        for (i = 0; i < weighingDates.length; i++) {
            const date = new Date(Date.parse(weighingDates[i]))
            const frequencyValue = weighings[i]
            const newFrequency = { x: date, y: frequencyValue }

            frequencies.push(newFrequency)
        }

        return frequencies
    }

    render() {
        return (
            <View style={styles.container}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    scale={{ x: "time" }}
                    containerComponent={
                        <VictoryZoomContainer
                        zoomDomain={{}}/>
                      }
                >
                    <VictoryAxis
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(y) => (`${y / 1000}kg`)}
                    />
                    <VictoryStack
                        colorScale={["brown", "green", "gold"]}
                    >
                        <VictoryBar
                            data={this.state.brownData}
                            width={200}
                        />
                        <VictoryBar
                            data={this.state.greenData}
                            width={200}
                        />
                    </VictoryStack>
                </VictoryChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(HistoryPage)
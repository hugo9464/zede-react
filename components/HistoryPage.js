import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Card } from 'react-native-material-ui';

import { connect } from 'react-redux'
import { getSummary } from '../services/weighing.service'
import { StackedBarChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";

const data = {
    labels: ["Janvier", "Février", "Mars", "Avril"],
    legend: ["Ménagère", "Verre", "Recyclage"],
    data: [
        [60, 60, 60],
        [30, 30, 60],
        [12, 15, 35],
        [30, 30, 60]
    ],
    barColors: ["#A97D25", "#428E14", "#F1EC32"]
};

const chartConfig = {
    backgroundGradientFrom: "red",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#118DA9",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height * 70 / 100;


class HistoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: [],
        };
    }

    render() {

        return (
            <View style={styles.main_container}>
                <StackedBarChart
                    // style={graphStyle}
                    data={data}
                    width={screenWidth}
                    height={screenHeight}
                    chartConfig={chartConfig}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
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


export default connect(mapStateToProps)(HistoryPage)
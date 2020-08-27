import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryStack } from "victory-native";

const dataBrown = [
    { month: "Janvier", total: 3 },
    { month: "Février", total: 6.5 },
    { month: "Mars", total: 4.5 },
    { month: "Avril", total: 9 }
];

const dataGreen = [
    { month: "Janvier", total: 13 },
    { month: "Février", total: 16.5 },
    { month: "Mars", total: 14.5 },
    { month: "Avril", total: 19 }
];

const dataYellow = [
    { month: "Janvier", total: 2 },
    { month: "Février", total: 2 },
    { month: "Mars", total: 3.4 },
    { month: "Avril", total: 0.8 }
];

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <VictoryChart
                    width={350}
                    theme={VictoryTheme.material}
                    domainPadding={20}>
                    <VictoryAxis
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`${x}kg`)}
                    />
                    <VictoryStack
                        colorScale={["brown", "green", "yellow"]}>
                        <VictoryBar
                            data={dataBrown}
                            x={"month"}
                            y={"total"}
                        />
                        <VictoryBar
                            data={dataGreen}
                            x={"month"}
                            y={"total"}
                        />
                        <VictoryBar
                            data={dataYellow}
                            x={"month"}
                            y={"total"}
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
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryStack, VictoryZoomContainer, VictoryLine, VictoryArea, VictoryScatter } from "victory-native";

class   MonthlyChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getWeeks() {
        let weeks = ["1 - 7", "8 - 14", "15 - 21", "22 - 28"]
        const lastDay = new Date(this.props.currentYear, this.props.selectedMonth, 0).getDate()

        if(lastDay === 28) {
            return weeks
        } else if( lastDay === 29) {
            weeks.push("29")
            return weeks
        } else {
            weeks.push("29 - "+lastDay)
            return weeks
        }
    }

    render() {
        console.log("brown data")
        console.log(this.props.brownData)
        console.log(this.props.greenData)

        return (
                <VictoryChart
                    height={200}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                    }}
                >

                    <VictoryAxis 
                        dependentAxis
                        tickFormat={(tick) => `${tick/1000}kg`}
                    />
                    <VictoryAxis
                        tickFormat={this.getWeeks()}
                    />
                    <VictoryGroup
                        offset={15}
                        padding={50}
                        style={{ data: { width: 10 }}}
                        colorScale={["#854000", "#e8b136", "#006600"]}
                    
                    >
                        <VictoryBar
                            data={this.props.brownData}
                        />
                        <VictoryBar
                            data={this.props.greenData}
                        />
                        <VictoryBar
                            data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }, { x: 4, y: 3 }, { x: 5, y: 4 }]}
                        />
                    </VictoryGroup>
                </VictoryChart>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue'
    }
});

export default MonthlyChart
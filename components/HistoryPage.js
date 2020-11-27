import React from "react";
import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryStack, VictoryZoomContainer } from "victory-native";
import { connect } from 'react-redux'

import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import { getOverview } from '../services/weighing.service'
import { maybeCompleteAuthSession } from "expo-web-browser";

import { Weighing } from '../models/weighing'
import WeighingDetails from './history/WeighingDetails'
import MonthlyChart from './history/MonthlyChart'
import { ScrollView } from "react-native";

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class HistoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brownData: '',
            greenData: '',
            selectedMonth: '',
            currentYear: '',
            selectedDay: '',
            weighings: null,
            markedDates: null,
            dates: {}
        };
    }

    componentDidMount() {
        this.setState({
            selectedMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear()
        })
        this.updateData()
        console.log("weighings")
    }

    updateData() {
        getOverview(this.props.userToken)
            .then((overviewResponse) => {
                this.getWeighingsFrequencies(overviewResponse.frequencies)

                const greenArray = this.markDates(this.state.greenData)
                const brownArray = this.markDates(this.state.brownData)
                const datesArray = greenArray.concat(brownArray)
                const markedDates = datesArray.reduce((c, v) => Object.assign(c, { [v]: { disabled: false, marked: true, dotColor: 'white' } }), {});
                this.setState({
                    markedDates: markedDates
                })
            });
    }

    markDates(weighings) {
        const dates = Object.keys(weighings)
        var datesArray = []
        dates.forEach((date) => {
            datesArray.push(date.split('T')[0])
        })
        return datesArray
    }

    getWeighingsFrequencies(frequencies) {
        this.setState({
            brownData: frequencies.BLUE,
            greenData: frequencies.GREEN
        })

        const blueWeighings = this.buildWeighings(frequencies.BLUE, 'BLUE')
        const greenWeighings = this.buildWeighings(frequencies.GREEN, 'GREEN')
        this.setState({ weighings: blueWeighings.concat(greenWeighings) })

    }

    buildWeighings(frequencies, type) {
        var weighings = []

        const dates = Object.keys(frequencies)
        const values = Object.values(frequencies)
        var i
        for (i = 0; i < dates.length; i++) {
            const date = new Date(Date.parse(dates[i]))
            const value = values[i]
            const weighing = new Weighing(type, value)
            weighings.push({ date, weighing })
        }

        return weighings
    }

    buildFrequencies(responseFrequencies, month) {
        var brownFrequencies = this.mapFrequencies(responseFrequencies.BLUE, month)
        var greenFrequencies = this.mapFrequencies(responseFrequencies.GREEN, month)

        this.setState({
            brownData: brownFrequencies,
            greenData: greenFrequencies
        })

    }

    mapFrequencies(rawFrequencies) {
        const weighingDates = Object.keys(rawFrequencies)
        const weighings = Object.values(rawFrequencies)

        var i
        for (i = 0; i < weighingDates.length; i++) {
            const date = new Date(Date.parse(weighingDates[i]))
            const frequencyValue = weighings[i]

        }

        return rawFrequencies
    }

    handleSelectedDay(selectedDay) {
        const date = new Date(Date.parse(selectedDay.dateString))
        this.setState({ selectedDay: date })
    }

    getDayAsText() {
        const date = this.state.selectedDay
        const dayName = LocaleConfig.locales['fr'].dayNames[date.getDay()]
        const day = date.getDate()
        const month = LocaleConfig.locales['fr'].monthNames[date.getMonth()]
        return dayName + ' ' + day + ' ' + month
    }

    handleMonthChange(month) {
        this.setState({
            selectedMonth: month.month,
            selectedDay: '',
            currentYear: month.year
        })
    }

    filterWeighingsByDate(type) {
        var filteredWeighings = []
        var totalWeight = 0
        var greenWeight = 0
        var blueWeight = 0
        var yellowWeight = 0
        this.state.weighings.forEach(weighing => {
            if (weighing.date.getTime() === this.state.selectedDay.getTime()) {
                filteredWeighings.push(weighing)
                totalWeight += weighing.weighing.weight
                switch (weighing.weighing.type) {
                    case 'BLUE':
                        blueWeight += weighing.weighing.weight
                        break
                    case 'YELLOW':
                        yellowWeight += weighing.weighing.weight
                        break
                    case 'GREEN':
                        greenWeight += weighing.weighing.weight
                        break
                }
            }

        })

        switch (type) {
            case 'BLUE':
                return parseFloat(blueWeight / 1000).toFixed(3).replace('.', ',')
            case 'YELLOW':
                return parseFloat(yellowWeight / 1000).toFixed(3).replace('.', ',')
            case 'GREEN':
                return parseFloat(greenWeight / 1000).toFixed(3).replace('.', ',')
        }
        return parseFloat(totalWeight / 1000).toFixed(3).replace('.', ',')
    }

    getMonthData(fullData) {
        const dates = Object.keys(fullData)
        const weighings = Object.values(fullData)
        console.log("date="+dates)
        let data = []
        let i
        for (i = 0; i < dates.length; i++) {
            const date = new Date(Date.parse(dates[i]))
            if (date.getMonth() === this.state.selectedMonth - 1) {
                data.push({ x: Math.ceil(date.getDate()/7), y: weighings[i] })
            }
        }
        return data
    }

    handleBackToChart = () => {
        this.setState({ selectedDay: '' })
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) => { this.handleSelectedDay(day) }}
                        monthFormat={'MMMM yyyy'}
                        onMonthChange={(month) => { this.handleMonthChange(month) }}
                        firstDay={1}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        disabledByDefault={true}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        style={{
                        }}
                        theme={{
                            calendarBackground: '#57E589',
                            textSectionTitleColor: 'white',
                            selectedDayBackgroundColor: '#ffffff',
                            selectedDayTextColor: 'black',
                            todayTextColor: 'black',
                            dayTextColor: 'white',
                            textDisabledColor: '#d9e1e8',
                            monthTextColor: 'white',
                            indicatorColor: 'white',
                            arrowColor: 'white',
                            textMonthFontWeight: 'bold',
                            textDayFontFamily: 'VentiCF-Bold',
                            textMonthFontFamily: 'VentiCF-Ultra'
                            
                        }}
                        markedDates={this.state.markedDates}
                    />
                </ScrollView>
                <View style={styles.detailsContainer}>
                    {this.state.selectedDay === '' ?
                        <View style={styles.chartContainer}>
                            <Text style={styles.monthText}>{LocaleConfig.locales['fr'].monthNames[this.state.selectedMonth - 1]} {this.state.currentYear}</Text>
                            <MonthlyChart
                                style={styles.chart}
                                selectedMonth={this.state.selectedMonth}
                                currentYear={this.state.currentYear}
                                brownData={this.getMonthData(this.state.brownData)}
                                greenData={this.getMonthData(this.state.greenData)}
                            />
                        </View>

                        :
                        <WeighingDetails
                            style={styles.dayDetailsContainer}
                            weighingDate={this.getDayAsText()}
                            totalWeight={this.filterWeighingsByDate()}
                            blueWeight={this.filterWeighingsByDate('BLUE')}
                            yellowWeight={this.filterWeighingsByDate('YELLOW')}
                            greenWeight={this.filterWeighingsByDate('GREEN')}
                            handleBackToChart={() => this.handleBackToChart()}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        height: '100%',
        backgroundColor: '#57E589'
    },
    monthsContainer: {
        backgroundColor: '#000099'
    },
    monthItem: {
        color: 'white',
        padding: 20
    },
    calendarContainer: {
        paddingTop: '5%',
    },
    detailsContainer: {
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#FFFFFA'
    },
    chartContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    monthText: {
        fontFamily: 'VentiCF-Ultra',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    chart: {
    }
});

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(HistoryPage)
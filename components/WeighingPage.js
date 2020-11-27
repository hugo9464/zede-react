import React from 'react'
import { StyleSheet, View, FlatList, Text, Image, Alert } from 'react-native'

import WeighingItem from '../components/Weighingitem'
import WeightPicker from '../components/WeightPicker'
import { connect } from 'react-redux'

import { getWeighings, saveWeighing } from '../services/weighing.service'
import { Weighing } from '../models/weighing'

import ZedeButton from './custom/ZedeButton'
import WeighingTypeButton from './custom/WeighingTypeButton'

class WeighingPage extends React.Component {

    constructor(props) {
        super(props);
        this.inputWeight = "";
        this.state = {
            weighings: [],
            selectedType: ""
        };
    }

    saveWeighing() {
        const weighing = new Weighing(this.state.selectedType, parseInt(this.inputWeight))
        saveWeighing(weighing, this.props.userToken).then(() =>
            this.setState({ selectedType: "" }),
            this.setState(prevState => ({
                weighings: [weighing, ...prevState.weighings]
            }))
        )
    }

    _selectHousehold() {
        this.setState({ selectedType: "BLUE" });
        console.log(this.state.selectedType)
    }

    _selectRecycling() {
        this.setState({ selectedType: "YELLOW" });
    }

    _selectGlass() {
        this.setState({ selectedType: "GREEN" });
    }

    getInputWeight = (childInputWeight) => {
        this.inputWeight = childInputWeight;
    }

    //TODO: mettre dans une fonction commune
    componentDidMount() {
        getWeighings(this.props.userToken).then((weighingsResponse) => {
            this.setState({ weighings: weighingsResponse.reverse() })
        });
    }

    getWeighingName() {
        if (this.state.selectedType === "BLUE") {
            return "TOUT VENANT"
        } else if (this.state.selectedType === "YELLOW") {
            return "RECYCLAGE"
        } else if (this.state.selectedType === "GREEN") {
            return "VERRE"
        }
    }
    render() {

        return (
            <View style={styles.main_container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/verre.png')} />
                </View>
                <View style={styles.weighingContainer}>
                    <View style={styles.types_container}>
                        <WeighingTypeButton
                            title="TOUT-VENANT"
                            onPress={() => this._selectHousehold()}
                            disabled={this.state.selectedType !== "" && this.state.selectedType !== "BLUE"}
                        />
                        <WeighingTypeButton
                            title="RECYCLAGE"
                            onPress={() => this._selectRecycling()}
                            disabled={this.state.selectedType !== "" && this.state.selectedType !== "YELLOW"} />
                        <WeighingTypeButton
                            title="VERRE"
                            onPress={() => this._selectGlass()}
                            disabled={this.state.selectedType !== "" && this.state.selectedType !== "GREEN"} />
                    </View>
                    <Text style={styles.title}>Ma pesée du jour</Text>
                    <Text style={styles.infoText}>Renseignez votre pesée de déchets</Text>
                    <Text>{this.getWeighingName()}</Text>
                    <View style={styles.picker_container}>
                        <WeightPicker inputWeightCallBack={this.getInputWeight} />
                    </View>

                    <View style={styles.button} >
                        <ZedeButton
                            title="ENREGISTRER MA PESÉE"
                            onPress={() => this.saveWeighing()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    types_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    picker_container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        width: '70%'
    },
    weighings: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    weighingContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#FFFFFA'
    },
    image: {
        height: '110%'
    },
    title: {
        fontFamily: 'VentiCF-Ultra',
        fontSize: 32,
    },
    infoText: {
        fontFamily: 'VentiCF-Medium',
        fontSize: 18
    }

})

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(WeighingPage)
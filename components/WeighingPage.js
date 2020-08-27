import React from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'

import WeighingItem from '../components/Weighingitem'
import WeightPicker from '../components/WeightPicker'
import { connect } from 'react-redux'

import { getWeighings, saveWeighing } from '../services/weighing.service'
import { Weighing } from '../models/weighing'

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

    // componentDidUpdate() {
    //     getWeighings(this.props.userToken).then((weighingsResponse) => {
    //         this.setState({ weighings: weighingsResponse})
    //     });
    // }

    render() {

        return (
            <View style={styles.main_container}>
                <View style={styles.types_container}>
                    <Button 
                        title="Ménagère"
                        color="brown" 
                        disabled={this.state.selectedType === "BLUE"} 
                        onPress={() => this._selectHousehold()} />
                    <Button 
                        title="Recyclage"
                        color="yellow" 
                        disabled 
                        onPress={() => this._selectRecycling()} />
                    <Button 
                        title="Verre" 
                        color="green"
                        disabled={this.state.selectedType === "GREEN"} 
                        onPress={() => this._selectGlass()} />
                </View>
                <View style={styles.picker_container}>
                    <WeightPicker inputWeightCallBack={this.getInputWeight} />
                </View>

                <View style={styles.button} >
                    <Button disabled={this.state.selectedType === ""} title="Envoyer ma pesée" onPress={() => this.saveWeighing()} />
                </View>

                <View style={styles.weighings}>
                    <FlatList
                        data={this.state.weighings}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <WeighingItem weighing={item} />}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    types_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    picker_container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    weighings: {
        flex: 4,
    }

})

const mapStateToProps = (state) => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps)(WeighingPage)
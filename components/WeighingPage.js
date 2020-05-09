import React from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'

import WeighingItem from '../components/Weighingitem'
import WeightPicker from '../components/WeightPicker'

import { getWeighings } from '../services/weighing.service'

class WeighingPage extends React.Component {

    constructor(props) {
        super(props);
        this.inputWeight = "";
        this.state = { 
            weighings: [],
            selectedType: ""
         };
    }

    _loadWeighings() {
        console.log(this.inputWeight)

    }

    _selectHousehold() {
        this.setState({ selectedType: "BLUE"});
    }

    _selectRecycling() {
        this.setState({ selectedType: "YELLOW"});
    }

    _selectGlass() {
        this.setState({ selectedType: "GREEN"});
    }

    getInputWeight = (childInputWeight) => {
        this.inputWeight = childInputWeight;
    }

    componentDidMount() {
        getWeighings().then((weighingsResponse) => {
            this.setState({ weighings: weighingsResponse})
        });
    }

    render() {

        return (
            <View style={styles.main_container}>
                <View style={styles.types_container}>
                    <Button title="Ménagère" disabled={this.state.selectedType === "BLUE"} onPress={() => this._selectHousehold()} />
                    <Button title="Recyclage" disabled onPress={() => this._selectRecycling()} />
                    <Button title="Verre" disabled={this.state.selectedType === "GREEN"} onPress={() => this._selectGlass()} />
                </View>
                <View style={styles.picker_container}>
                    <WeightPicker inputWeightCallBack = {this.getInputWeight} />
                </View>
                
                <View style={styles.button} >
                    <Button disabled={this.state.selectedType === ""} title="Envoyer ma pesée" onPress={() => this._loadWeighings()} />
                </View>

                <View style={styles.weighings}>
                    <FlatList
                        data={this.state.weighings}
                        // utiliser un ID unique quand il sera renvoyé par l'API
                        // keyExtractor={(item) => item.id.toString}
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

export default WeighingPage
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {Picker} from 'react-native'
export default class WeightPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kilograms: "0",
            grams: "000"
        }
    }

    updateKilograms(newKilograms) {
        this.setState({
            kilograms: newKilograms
        }, () => {
            this.props.inputWeightCallBack(this.state.kilograms + this.state.grams);
        })

    }

    updateGrams(newGrams) {
        this.setState({
            grams: newGrams
        }, () => {
            this.props.inputWeightCallBack(this.state.kilograms + this.state.grams);
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.picker_container}>
                    <Picker
                        selectedValue={this.state.kilograms}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            this.updateKilograms(itemValue)
                        }>
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="13" value="13" />
                        <Picker.Item label="14" value="14" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="16" value="16" />
                        <Picker.Item label="17" value="17" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="19" value="19" />
                        <Picker.Item label="20" value="20" />
                    </Picker>
                    <Text>KG</Text>
                </View>
                <View style={styles.picker_container}>
                    <Picker
                        selectedValue={this.state.grams}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            this.updateGrams(itemValue)
                        }>
                        <Picker.Item label="0" value="000" />
                        <Picker.Item label="100" value="100" />
                        <Picker.Item label="200" value="200" />
                        <Picker.Item label="300" value="300" />
                        <Picker.Item label="400" value="400" />
                        <Picker.Item label="500" value="500" />
                        <Picker.Item label="600" value="600" />
                        <Picker.Item label="700" value="700" />
                        <Picker.Item label="800" value="800" />
                        <Picker.Item label="900" value="900" />
                    </Picker>
                    <Text>G</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    picker_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    picker: {
        height: 20,
        width: 100
    }
});
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const colors = [{ houseHold: "#54e48c" }, { "glass": "green" }]

class WeighingTypeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: ''
        };
    }

    componentDidMount() {
        console.log("did mount")
        if (this.props.title === "TOUT-VENANT") {
            this.setState({ backgroundColor: 'rgba(0,51,102,1)' })
        } else if (this.props.title === "RECYCLAGE") {
            this.setState({ backgroundColor: 'rgba(230,230,0,1)' })
        } else {
            this.setState({ backgroundColor: 'rgba(0,102,0,1)' })
        }
    }


    getBackgroundColor() {

        console.log("did update")

        console.log("title=" + this.props.title)
        console.log("disabled=" + this.props.disabled)

        var backgroundColor

        if (this.props.title === "TOUT-VENANT") {
            if (this.props.disabled) {
                return 'rgba(133,64,0,0.3)'
            } else {
                return 'rgba(133,64,0,1)'
            }
        } else if (this.props.title === "RECYCLAGE") {
            if (this.props.disabled) {
                return 'rgba(232,177,54,0.3)'
            } else {
                return 'rgba(232,177,54,1)'
            }
        } else {
            if (this.props.disabled) {
                return 'rgba(0,102,0,0.3)'
            } else {
                return 'rgba(0,102,0,1)'
            }
        }
    }


    render() {
        const { onPress, title, backgroundColor, disabled } = this.props;

        return (
            <TouchableOpacity
                style={[styles.container, { backgroundColor: this.getBackgroundColor() }]}
                onPress={onPress}
                underlayColor={this.props.disabled ? 'grey' : '#fff'}
                >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    houseHold: {
        backgroundColor: '#54e48c'
    },
    text: {
        fontFamily: 'VentiCF-Bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 12
    }
})

export default WeighingTypeButton
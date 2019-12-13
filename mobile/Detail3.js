import * as Speech from 'expo-speech';

import { Button, View } from 'react-native'
import React, {Component} from 'react'

import { TextInput } from 'react-native-gesture-handler';

export default class Detail3 extends Component {
    static navigationOptions = {
        title: 'Speak',
    };
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
    }
    speak = () => {
        Speech.speak(this.state.text);
    }
    render(){
        return (
        <View style={{flex: 1}}>
            <TextInput
            style={{borderWidth: 2, borderColor: 'black', height: 40}}
            onChangeText={(text) => {
                this.setState({
                    text: text
                })
            }}
            ></TextInput>
            <Button title="Play" onPress={this.speak} />
        </View>)
    }
}
import { Grid, LineChart } from 'react-native-svg-charts'
import React, {Component} from 'react'

import { View } from 'react-native'

export default class Detail4 extends Component {
    static navigationOptions = {
        title: 'Chart',
    };
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        setInterval(() => {
            const newData = this.state.data
            newData.push(Math.random())
            this.setState({data: newData})
        }, 200)
    }

    render(){
        
        let data 
        if(this.state.data.length < 30){
            data = this.state.data.slice(0, this.state.data.length)
        }else{
            data = this.state.data.slice(this.state.data.length-30, this.state.data.length)
        }
        // expo install react-native-svg-charts
        // expo install react-native-svg
        return (
        <View style={{flex: 1}}>
            <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
        </View>)
    }
}
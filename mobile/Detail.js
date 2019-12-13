import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Component} from 'react'

import {Accelerometer} from 'expo-sensors'
Accelerometer.setUpdateInterval(100);

/* funzione
export default () =>{
    return (<View><Text>Details</Text></View>)
}
*/
//Classe
export default class Detail extends Component{
    static navigationOptions = {
        title:'Detail',
    }
    constructor(props){
        super(props)
        this._subscription = null,
        this.state = {
            accelerometerData:null,
            containerWidth:0,
            containerHeight:0
        }
    }
    componentDidMount(){
        this._subscription = Accelerometer.addListener(accelerometerData =>{
            this.setState({accelerometerData}); 
        });
    }
    componentWillUnmount(){
        if(this._subscription){
            this._subscription.remove();
        }
    }
    
    render(){
        if(this.state.accelerometerData){
            let {x,y,z} = this.state.accelerometerData;
            const dotSize = (30*z)+55
            const calcTop = (((-this.state.containerHeight-dotSize)/2)*-y)+((this.state.containerHeight/2) -dotSize/2)
            const calcLeft = (((this.state.containerWidth-dotSize)/2)*-x)+((this.state.containerWidth/2) -dotSize/2)
            const isTop = (calcTop <this.state.containerHeight/2)
            const isLeft = (calcLeft < this.state.containerWidth/2)
    
            return(<View>
                {/*<Text>{x},{y},{z}</Text>*/}
                <View style={styles.accContainer}
                            onLayout={(event) =>{
                            var {x,y,width,height} = event.nativeEvent.layout;
                            this.setState({containerWidth:width,containerHeight:height})
                            }} 
                >
                    <View style={styles.row1}>
                        <View style={[styles.cell,styles.cellTopLeft,(isTop && isLeft)?styles.highlight: {}]}></View>
                        <View style={[styles.cell,styles.cellTopRight,(isTop && !isLeft)?styles.highlight: {}]}></View>
                    </View> 
                    <View style={styles.row2}>
                        <View style={[styles.cell,styles.cellBottomLeft,(!isTop && isLeft)?styles.highlight: {}]}></View>
                        <View style={[styles.cell,styles.cellBottomRight,(!isTop && !isLeft)?styles.highlight: {}]}></View>
                    </View> 
                    <View style={[styles.dot,{
                            top:calcTop,
                            left:calcLeft,
                            width:dotSize,
                            height:dotSize,
                            borderRadius: dotSize/2
                            }]}>

                    </View>
                </View> 
                </View>)
        }else{
            return(<View><Text>Waiting for data</Text></View>)
        }
    }
}

const styles = StyleSheet.create({
    accContainer:{
        height: 400,
        flexDirection: 'column',
        borderWidth:1,
        borderColor:'black'
    },
    row1:{
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    row2:{
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    cell:{
        flex:1,
        borderColor: 'gray'
    },
    cellTopLeft:{
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5
    },
    cellTopRight:{
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5
    },
    cellBottomLeft:{
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
    },
    cellBottomRight:{
        borderLeftWidth: 0.5,
        borderTopWidth: 0.5,
    },
    dot:{
        position: 'absolute',
        backgroundColor:'red'
    },
    highlight:{
        backgroundColor:'yellow'
    }
})
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, {Marker} from 'react-native-maps'
import React, {Component} from 'react'
import {Text, View} from 'react-native'

export default class Detail2 extends Component {
    static navigationOptions = {
        title: 'Mappa',
    };
    constructor(props){
        super(props)
        this.state = {
            initialRegion: {
                latitude: 41.902,
                longitude: 12.496,
                latitudeDelta: 1,
                longitudeDelta:  1,
            },
            markers: [
                {coordinate: {latitude: 41.902, longitude: 12.496}, title: 'Ciao', description: 'Test'}
            ],
            location: null
        }
    }
    async componentWillMount(){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Non ho accesso alla posizione')
        }else{
            let location = await Location.getCurrentPositionAsync({});
            if(location){
                this.setState({ 
                    location,
                    markers: [{coordinate: {latitude: location.coords.latitude, longitude: location.coords.longitude}, title: 'Mia Posizione', description: 'Test'}],
                    initialRegion: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    },
                    
                })
            }
            
        }
    }
    render(){
        return (
        <View style={{flex: 1}}>
        
           <MapView
                style={{flex: 1}}
                region={this.state.initialRegion}
            >
            {this.state.markers.map(marker => (
                <Marker
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                />
            ))}
            </MapView>
        </View>)
    }
}
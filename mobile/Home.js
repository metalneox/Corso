import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, {Component} from 'react';

const ListItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableHighlight onPress={() => {
          props.navigator.navigate(props.item.item.navigateTo)
      }}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{props.item.item.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}
const DATA = [
    {id: '1', title: 'Accelerometro', navigateTo: 'Detail1' },
    {id: '2', title: 'Mappa / GPS', navigateTo: 'Detail2'},
    {id: '3', title: 'Speech', navigateTo: 'Detail3'},
    {id: '4', title: 'Grafico', navigateTo: 'Detail4'}
]
export default class Home extends Component {
    static navigationOptions = {
        
        title: 'Home',
    };
    render(){
        const navigator = this.props.navigation
        
        return (
            <View style={styles.container}>
              <FlatList
              data={DATA}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={(item) => (<ListItem item={item} navigator={navigator}></ListItem>)}
              >
              </FlatList>
            </View>
          );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  itemContainer: {
    padding: 20,
    flex: 1,
    maxWidth: '50%'
  },
  item: {
    backgroundColor: '#1543eb',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 3.8,
    elevation: 5
  },
  itemText: {
    color: 'white',
    fontSize: 20
  }
});
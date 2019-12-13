import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight,Button,TextInput } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import axios from 'axios';

/*
const DATA = [
  {
    id: "test",
    title: "Riga 1",
    photo: "https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-08-01-17-16/news-videogiochi-primo-diablo-giocabile-browser-1564676135862.jpg/EG11/resize/1200x-1/news-videogiochi-primo-diablo-giocabile-browser-1564676135862.jpg"
  },
  {
    id: "test2",
    title: "Riga 2",
    photo: "https://www.gelestatic.it/thimg/y51sqEj5y0cp7DGpdUzJPGGtt60=/960x540/smart/http%3A//iltirreno.gelocal.it/image/contentid/policy%3A1.14327806%3A1540428464/image/image.jpg%3Ff%3Ddetail_558%26h%3D720%26w%3D1280%26%24p%24f%24h%24w%3Dd5eb06a"
  },
  {
    id: "test3",
    title: "Riga 3",
    photo: "data:image/jpeg;base64,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"
  }
]
*/

class Item extends React.Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Image
          style={{ width: 100, height: 100, borderRadius: '50%' }}
          source={{ uri: this.props.photo }}
        />
        <Text style={styles.listItemText}>{this.props.title}</Text>
      </View>
    )
  }
}


class App extends React.Component {
  static navigationOptions = {
    title: "App di Prova",
  }

  constructor(props){
    super(props) 
    this.state = {
      items: []
    }
  }

  async componentDidMount(){
    try{
      const response = await axios.get("http://api.openweathermap.org/data/2.5/group",{
        params:{
          id:"524901,703448,2643743",
          units: "metric",
          appid: "fe85febe00727299960141998cee32b7"
        }
      })
      console.log(response)

      const items = response.data.list.map((listItem) => {
        return{
          id: String(listItem.id),
          title: listItem.name,
          photo: "https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-08-01-17-16/news-videogiochi-primo-diablo-giocabile-browser-1564676135862.jpg/EG11/resize/1200x-1/news-videogiochi-primo-diablo-giocabile-browser-1564676135862.jpg"
        }
      })
      this.setState({
        items: items
      })

    }catch(e){
      console.error(e)
    }

  }


  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.state.items}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => { this.props.navigation.push('Schermata2', { item }) }}>
              <View>
                <Item title={item.title} photo={item.photo} />
              </View>
            </TouchableHighlight>)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}


class Schermata2 extends React.Component {
  static navigationOptions = {
    title: "Dettaglio",
  }
  render() {
    const item = this.props.navigation.getParam('item')
    return <View>
      <Text>{item.title}</Text>
      <Button onPress={() => {
          this.props.navigation.push('Schermata3')
        }} title=" Vai Alla schermata 3">
        </Button>
      </View>
  }
}

class Schermata3 extends React.Component {
  static navigationOptions = {
    title: "Dettaglio 2",
  }
  constructor(props){
    super(props)
    this.state = {
      campo1: '',
      campo2: ''
    }
  }
  render() {
    return(
      <View style={styles.schermata3}>
        <View>
          <Text>Campo 1</Text>
          <TextInput placeholder="Inserisci Testo" style={styles.textInput} onChangeText={(text) =>{
            this.setState({
              campo1: text
            })
          }}value={this.state.campo1}
          />
          <Text>{this.state.campo1}</Text>
        </View>
        <View>
          <Text>Campo 2</Text>
          <TextInput placeholder="Inserisci Testo" style={styles.textInput} onChangeText={(text) =>{
            this.setState({
              campo2: text
            })
          }}value={this.state.campo2}
          />
          <Text>{this.state.campo2}</Text>
        </View>
        <View style={styles.formButton} >
          <Button onPress={()=>{
            alert(this.state.campo1 + ',' +this.state.campo2)
          }} title="Invia" />
        </View>
      </View>

    )
  }
}



const Stack = createStackNavigator({
  Home: App,
  Schermata2: Schermata2,
  Schermata3: Schermata3
});

export default createAppContainer(Stack)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    padding: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  flatList: {
    flex: 1,
    width: '100%'
  },
  listItemText: {
    paddingLeft: 20,
    fontSize: 16
  },
  textInput:{
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15
  },
  schermata3:{
    padding:20
  },
  formButton:{
    paddingTop: 50
  }
});

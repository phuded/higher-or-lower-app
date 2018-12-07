import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Alert, FlatList} from 'react-native';
import HelloWorldApp from './HelloWorldApp.js';
import Touchables from './Touchables.js';

export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {text: '', isLoading: true};
  }

  componentDidMount(){

    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

    return (
      <ScrollView>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HelloWorldApp/>
        <View style={{width: 350, height: 150, backgroundColor: 'steelblue'}}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Type here to translate!"
                  onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                  {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
        </View>

        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          title="Press Me"
        />

        <Touchables/>

        {this.state.isLoading &&
            <Text>WAITING</Text>

        }

        {!this.state.isLoading &&
            <FlatList
                      data={this.state.dataSource}
                      renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                      keyExtractor={({id}, index) => id}
                    />
        }
       </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

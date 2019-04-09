import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableItem from './TouchableItem';
import Store from '../Store';

const cameraIcon = Platform.OS === 'ios'
  ? "ios-camera"
  : "md-camera";

const trashIcon = Platform.OS === 'ios'
  ? "ios-trash"
  : "md-trash";


export default class JournalItemInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picUrl : null,
      lastLocation : {},
    };

  }

  _launchCamera = () => {
    //const result = await
    console.log(this.props.componentId);
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'ViewCamera',
            passProps: {
              callback_new_pic: this._callback_new_pic
            },
          }
        }]
      }
    })
  };

  _submit(text) {
      this.meintextInput.clear();
      this._submitWithWeather(text, this.state.picUrl);
      this.setState({picUrl: null });
  }

  _callback_new_pic = (picUrl) => {
    console.log(`Picture URL = ${picUrl}`);
    this.setState({picUrl});
    this.meintextInput.focus();
  }

  _deleteItems() {
    Alert.alert(
        'Einträge löschen',
        'Sollen wirklich alle Einträge gelöscht werden?',
        [
          {
            text: 'Nein',
            style: 'cancel'
          },
          {
            text: 'Ja',
            onPress: async () => {
              await Store.deleteItems();
              this.props.refresh();
            }
          }
        ]
    );
  }

  _getWeather = async () => {
    let result = { location: null, weather: null };
    let locationCoords = `lon=13.404954&lat=52.520008`;

    if (this.props.aktLocation) {
      const {longitude, latitude} = this.props.aktLocation.coords;
      locationCoords = `lon=${longitude}&lat=${latitude}`;
      console.log(`Koordinaten sind ${locationCoords}`);  
    }
    else {
      console.log('Keine Koordinaten vorhanden');
    }
    

    
    const apiKey = 'APPID=2a3d1d4035b2805407854d3da85df554';
    const url = 'http://api.openweathermap.org/data/2.5/weather?' +
            locationCoords +
            '&' +
            apiKey +
            '&units=metric&lang=de';

    try {
      const response = await fetch(url);
      const weatherJSON = await response.json();
      const { weather, main, name } = weatherJSON;

      result = {
        location: name,
        weather: `${Math.floor(main.temp)}°C ${weather[0].description}`
      };
    } catch (error) {
      console.log('Error fetching weather', error);
    }
    return result;
  }

  _submitWithWeather = async (text, photo) => {
    const { location, weather } = await this._getWeather();
    this.props.onMeinSubmit({ text, photo, location, weather });
  }

  _aufruf_mitPosition = async () => {

    if (this.props.aktLocation === this.state.lastLocation) {
      console.log('Location hat sich nicht verändert');
    }
    else {
      console.log(`Àufruf mit Position = ${JSON.stringify(this.props.aktLocation) || 'unbekannt'} `);
      const { location, weather } = await this._getWeather();
      if (location) {
        console.log(`Àufruf mit Position Ort = ${location}`);
        this.props.ortGefunden(location);
      }  
      else {
        console.log('Noch keine Location gefunden');
      }
      this.state.lastLocation = this.props.aktLocation;
    }
  }
  
  render() {

    const photoIcon = this.state.picUrl 
      ? <Image
          style={styles.imagePreview}
          source={{ uri : this.state.picUrl }}
        />
      : <Icon name={cameraIcon} size={24} color="deepskyblue" />;

    this._aufruf_mitPosition();

    return (
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.photoIcon}>
                <TouchableItem onPress={this._launchCamera}>
                  {photoIcon}
                </TouchableItem>
              </View>
              <TextInput
                style={styles.input}
                ref={ input => (this.meintextInput = input)}
                underlineColorAndroid="transparent"
                placeholder="Eintrag erstellen"
                returnKeyType="done"
                onSubmitEditing={event =>
                  this._submit(event.nativeEvent.text)}
              />
            </View>
            <TouchableItem onPress={() => this._deleteItems() }>
              <View>
                <Icon name={trashIcon} size={24} color="deepskyblue" />
              </View>
            </TouchableItem>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height:40,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'deepskyblue',
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imagePreview: {
    width:24,
    height:24
  }
});

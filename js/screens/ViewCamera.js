import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableItem from '../components/TouchableItem';
import {Navigation} from 'react-native-navigation';



const cameraIcon = Platform.OS === 'ios'
  ? "ios-camera"
  : "md-camera";

export default class ViewCamera extends Component {

  constructor(props) {
      super(props);
      this.state = {
        newPicUrl : null
      };
      Navigation.events().bindComponent(this);
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Foto'
        },
        rightButtons: [{
          id: 'saveBtn',
          text: 'Übernehmen'
        }],
        leftButtons: [{
          id: 'cancelBtn',
          text: 'Abbrechen'
        }],
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'cancelBtn') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'saveBtn') {
      this.props.callback_new_pic(this.state.newPicUrl);
      Navigation.dismissModal(this.props.componentId);
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.state.newPicUrl = data.uri;
      console.log(data.uri);
    }
  };

  render() {

    return (
          <View style={styles.container}>
            <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            />
              <View style={styles.photoIcon}>
                <TouchableItem onPress={this.takePicture.bind(this)} style={styles.capture}>
                  <Icon name={cameraIcon} size={36} color="red" />
                </TouchableItem>
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  capture: {
    flex: 0,
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
//import { SimpleLineIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableItem from './TouchableItem';
import { RNCamera } from 'react-native-camera';

const cameraIcon = Platform.OS === 'ios'
  ? "ios-camera"
  : "md-camera";

export default class JournalItemInput extends Component {

  _launchCamera = async () => {
    //const result = await
  };

  _submit(text) {
      this.meintextInput.clear();
      this.props.onMeinSubmit(text);
  }

  render() {

    return (
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                  console.log(barcodes);
                }}
            />
            <View style={styles.photoIcon}>
              <TouchableItem onPress={() => this._launchCamera()}>
                <Icon name={cameraIcon} size={24} color="deepskyblue" />
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
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height:40,
  },
  inputContainer: {
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
});

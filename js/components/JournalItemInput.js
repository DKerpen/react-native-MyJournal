import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableItem from './TouchableItem';

const cameraIcon = Platform.OS === 'ios'
  ? "ios-camera"
  : "md-camera";

export default class JournalItemInput extends Component {

  _launchCamera = () => {
    //const result = await
    console.log(this.props.componentId);
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'ViewCamera',
          }
        }]
      }
    })

//    Navigation.push(this.props.componentId, {
//          component: {
//            name: 'ViewCamera',
//          }
//        });

  };

  _submit(text) {
      this.meintextInput.clear();
      this.props.onMeinSubmit(text);
  }

  render() {
    console.log('props; ', this.props)

    return (
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <View style={styles.photoIcon}>
              <TouchableItem onPress={this._launchCamera}>
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

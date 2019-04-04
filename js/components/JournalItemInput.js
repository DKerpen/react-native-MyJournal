import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableItem from './TouchableItem';

const cameraIcon = Platform.OS === 'ios'
  ? "ios-camera"
  : "md-camera";

export default class JournalItemInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picUrl : null
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
      this.props.onMeinSubmit(text, this.state.picUrl);
      this.setState({picUrl: null });
  }

  _callback_new_pic = (picUrl) => {
    console.log(`Picture URL = ${picUrl}`);
    this.setState({picUrl});
    this.meintextInput.focus();
  }

  render() {

    const photoIcon = this.state.picUrl 
      ? <Image
          style={styles.imagePreview}
          source={{ uri : this.state.picUrl }}
        />
      : <Icon name={cameraIcon} size={24} color="deepskyblue" />;

    return (
        <KeyboardAvoidingView behavior="padding">
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
  imagePreview: {
    width:24,
    height:24
  }
});

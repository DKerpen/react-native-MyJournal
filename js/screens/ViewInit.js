import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import { navHome, goHome } from '../screens/TabNav'

import { USER_KEY } from '../Config'

export default class ViewInit extends React.Component {

  async componentDidMount() {
    try {
      console.log('Ruf die TabLeiste auf')
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', user)
      navHome()
    } catch (err) {
      console.log('error: ', err)
      navHome()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Lade...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

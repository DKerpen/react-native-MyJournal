// ViewSettings.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, View, Text } from 'react-native';

import Store from '../Store';

export default class ViewSettings extends Component {

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
              this.props.screenProps.refresh();
            }
          }
        ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>`Alle Einträge löschen {this.props.text}`</Text>
        <Button 
          title='Alle Einträge löschen'
          onPress={() => this._deleteItems()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
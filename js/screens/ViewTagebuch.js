/**
 * ViewTagebuch
 *
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import JournalItems from '../components/JournalItems';
import JournalItemInput from '../components/JournalItemInput';
import Store from '../Store';


export default class ViewTagebuch extends Component {
  state = { 
    items : [],
    myLocation: null,
    myOrt: null,
  };

  componentWillMount() {
    this._refreshItems();
    this._findCoordinates();
  }

  _findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({myLocation: position});
        console.log(`Position gefunden ${JSON.stringify(position)}`);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };   

  _refreshItems = async () => {
    const items = await Store.loadItems();
    this.setState({ items });
  };

  _getSectionTitleFromDate(date)  {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  _getItemsWithSections(items) {
    if (items.length === 0) return [];

    let sectionTitle = this._getSectionTitleFromDate(items[0].date);
    let sections = [{ data: [], title: sectionTitle }];
    items.forEach(item => {
      sectionTitle = this._getSectionTitleFromDate(item.date);
      let lastSection = sections[sections.length - 1];

      if (lastSection.title == sectionTitle) {
        lastSection.data.push(item);
      } else {
        sections.push({ data: [item], title: sectionTitle });
      }
    });
    return sections;
  }

  _addItem(item) {

    let { items } = this.state;
    item.date = Date.now();
    items = [item, ...items];
    this.setState({ items: items, myOrt: item.location });
    Store.saveItems(items);
  }

  _setMyOrt(newOrt) {
    this.setState({myOrt: newOrt});
    console.log(`Neuer Ort eingetragen = ${newOrt}`);
  }

  render() {
    const sections = this._getItemsWithSections(this.state.items);
    return (      
      <View style={styles.container}>
        <JournalItems items={sections} />
        <Text style={styles.standort}>
          {`Aktueller Standort ist ${this.state.myOrt || 'unbekannt'}`}
        </Text>
        <JournalItemInput aktLocation={this.state.myLocation} 
          onMeinSubmit={item => this._addItem(item)}
          ortGefunden={newOrt => this._setMyOrt(newOrt)}
          refresh={() => this.setState({ items: []})}  
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  standort: {
    margin: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
  }
});

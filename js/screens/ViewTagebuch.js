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
} from 'react-native';

import JournalItems from '../components/JournalItems';
import JournalItemInput from '../components/JournalItemInput';
import Store from '../Store';


export default class ViewTagebuch extends Component {
  state = { items : [] };

  componentWillMount() {
    this._refreshItems();
  }

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

  _addItem(text, photo) {

    let { items } = this.state;

    const newItem = { text: text, photo: photo, date: Date.now() };

  //  if (items.length > 0) {
  //    console.log(`Neuer Eintrag: ${this._getSectionTitleFromDate(Date.now)} ${items.length} Foto:${newItem.photo}`);
  //  }
    items = [newItem, ...items];
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
    const sections = this._getItemsWithSections(this.state.items);
    return (      
      <View style={styles.container}>
        <JournalItems items={sections} />
        <JournalItemInput onMeinSubmit={(text, photo) => this._addItem(text, photo)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

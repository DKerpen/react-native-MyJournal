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

const journalItems = [];

export default class ViewTagebuch extends React.Component<Props> {
  state = { items : journalItems};

  _addItem(text) {

    let { items } = this.state;
    let [head, ...tail] = items;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const today = `${day}.${month}.${year}`;
    console.log(`Neuer Eintrag: ${today} ${items.length}`);

    if (head === undefined  || head.title != today) {
      head = { data: [], title: today };
      tail = items;
    }

    const newItem = { text: text, date: now.getTime() };
    head.data = [newItem, ...head.data];

    items = [head, ...tail];
    this.setState({ items });

  }

  render() {

    return (
      <View style={styles.container}>
        <JournalItems items={this.state.items} />
        <JournalItemInput onMeinSubmit={text => this._addItem(text)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

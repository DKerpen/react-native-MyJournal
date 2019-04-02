import React, {Component} from 'react';
import {
  SectionList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import JournalItemRow from './JournalItemRow.js';

export default class JournalItems extends Component {
  render() {
    if (this.props.items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>Keine Einträge</Text>
        </View>
      );

    return (
          <SectionList
            style={styles.list}
            sections={this.props.items}
            renderItem={({ item }) =>
                <JournalItemRow item={item} />
              }
            renderSectionHeader={({ section }) => (
              <Text style={styles.listHeader}>{section.title}</Text>
              )}
            keyExtractor={item => item.date}
            ItemSeparatorComponent={() =>
              <View style={styles.listSeparator} />}
          />
        );
    }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 24
  },
  listHeader: {
    backgroundColor: 'lightcyan',
    color: 'gray',
    textAlign: 'center'
  },
  noItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    color: 'darkslategray',
    fontSize: 22,
    fontWeight: '300'
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightblue'
  },
});

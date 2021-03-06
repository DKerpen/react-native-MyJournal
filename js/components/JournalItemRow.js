import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TouchableItem from './TouchableItem';

  export default class JournalItems extends Component {
    render() {

      const { item } = this.props;
      const { text, location, weather } = item;

      const date = new Date(item.date);
      const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      const time = `${date.getHours()}:${minutes}`;
      const photo = item.photo ? (
        <Image style={styles.image} source={{ uri: item.photo }} />
      ) : ( 
        <Image style={styles.image} source={require('../../bilder/foto.png')} />
      );

      return (
        <TouchableItem>
          <View style={styles.container}>
            {photo}
            <View style={styles.itemText}>
              <Text numberOfLines={3} style={styles.listItem}>{text}</Text>
              <Text style={styles.time}>
                {`${location || ''}  ${weather || ''}    ${time}`}
              </Text>
            </View>
          </View>
        </TouchableItem>
      )
    }
  }

  const styles = StyleSheet.create({
    itemText: {
      flex: 1,
      justifyContent: 'space-between',
    },
    listItem: {
      alignItems: 'flex-start',
      color: 'red',
      marginLeft: 15
    },
    time: {
      color: 'gray',
      fontSize: 11,
      fontWeight: '100',
      alignSelf: 'flex-end'
    },
    image: {
      width: 70,
      height: 70,
      marginRight: 5
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 3,
      minHeight: 50
    },
  });

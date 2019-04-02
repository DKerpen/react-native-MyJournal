import React, {Component} from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

const TouchableItem = Platform.OS === 'ios'
  ? TouchableOpacity
  : TouchableNativeFeedback;

export default TouchableItem;

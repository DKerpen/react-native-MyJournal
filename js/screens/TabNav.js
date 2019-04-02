import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';

const tagebuchIcon = Platform.OS === 'ios'
  ? "ios-book"
  : "md-book";

const fotosIcon = Platform.OS === 'ios'
    ? "ios-images"
    : "md-images";

export const goHome = () => Navigation.setRoot({
      root: {
        stack: {
          id: 'App',
          children: [
            {
              component: {
                name: 'Home',
              }
            }
        ],
        }
      }
});

export const navHome = () => Navigation.setRoot(
  {
    root: {
      bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'ViewTagebuch',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Tagebuch',
                icon: require('../../bilder/book.png')
              }
            }
          },
        },
        {
          component: {
            name: 'ViewFotos',
            options: {
              bottomTab: {
                text: 'Fotos',
                fontSize: 12,
                icon: require('../../bilder/picture.png')
              }
            }
          },
        },
      ],
    }
  }
});

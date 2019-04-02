import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  console.log(`Start Register Screens`);
  Navigation.registerComponent('ViewInit', () => require('./ViewInit').default);
  Navigation.registerComponent('ViewTagebuch', () => require('./ViewTagebuch').default);
  Navigation.registerComponent('ViewFotos', () => require('./ViewFotos').default);
  console.log(`End Register Screens`);
}

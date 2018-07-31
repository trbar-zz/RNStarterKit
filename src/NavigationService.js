import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('NavigationService setTopLevelNavigator')
  _navigator = navigatorRef;
  console.log('_navigator', _navigator)
}

function navigate(routeName, params) {
  console.log('NavigationService navigate')
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};

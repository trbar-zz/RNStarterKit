import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
    {
      id: 'Login',
      title: 'Login',
      screen: Screens.LoginV1,
      children: []
    },
    {
      id: 'SignUp',
      title: 'Sign Up',
      screen: Screens.SignUp,
      children: []
    }
];

let menuRoutes = _.cloneDeep(MainRoutes);

export const MenuRoutes = menuRoutes;

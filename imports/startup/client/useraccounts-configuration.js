import { Accounts } from 'meteor/std:accounts-ui'
import { browserHistory } from 'react-router';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: '/login',
  signUpPath: '/registration',
  homeRoutePath: '/profile',
  profilePath: '/profile',

  minimumPasswordLength: 6

  
});


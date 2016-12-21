import { Accounts } from 'meteor/std:accounts-ui'
import { browserHistory } from 'react-router';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: '/login',
  signUpPath: '/signup',
  resetPasswordPath: '/reset-password',
  profilePath: '/profile',
  onSignedInHook: () => browserHistory.push('/'),
  onSignedOutHook: () => browserHistory.push('/loginreg'),
  minimumPasswordLength: 6
  
});


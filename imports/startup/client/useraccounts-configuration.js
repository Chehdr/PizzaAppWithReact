import { Accounts } from 'meteor/std:accounts-ui'
import { browserHistory } from 'react-router';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: browserHistory.push('/login'),
  signUpPath: browserHistory.push('/signup'),
  resetPasswordPath: browserHistory.push('/login'),
  profilePath: browserHistory.push('/userpanel'),
  onSignedInHook: () => browserHistory.push('/userpanel'),
  onSignedOutHook: () => browserHistory.push('/'),
  minimumPasswordLength: 6
});


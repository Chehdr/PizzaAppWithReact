import { Accounts } from 'meteor/std:accounts-ui'
import { browserHistory } from 'react-router';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  loginPath: browserHistory.push('/'),
  signUpPath: browserHistory.push('/'),
  resetPasswordPath: browserHistory.push('/'),
  profilePath: browserHistory.push('/userpanel'),
  onSignedInHook: () => browserHistory.push('/userpanel'),
  onSignedOutHook: () => browserHistory.push('/'),
  onPostSignUpHook: browserHistory.push('/userpanel'),
  minimumPasswordLength: 6
});


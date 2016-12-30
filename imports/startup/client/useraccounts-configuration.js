import { browserHistory } from 'react-router';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  onSignedInHook: () => browserHistory.push('/'),
  onSignedOutHook: () => browserHistory.push('/loginreg'),
  minimumPasswordLength: 6
  
});


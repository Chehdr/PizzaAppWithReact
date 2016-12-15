import '/imports/startup/client';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import LoginPage from '../imports/ui/components/accounts/login.jsx';
import MainLayout from '../imports/ui/layouts/main.jsx';

import IndexPage from '../imports/ui/components/index.jsx';
import NotFoundPage from '../imports/ui/components/errors/not-found.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ MainLayout }>
        <IndexRoute component={ IndexPage } />
        <Route path="login" component={ LoginPage } />
        <Route path="signup" component={ LoginPage } />
        <Route path="userpanel" component={ IndexPage } />
      </Route>
      <Route path="*" component={ NotFoundPage } />
    </Router>,
    document.getElementById('Render-Place')
  );
});
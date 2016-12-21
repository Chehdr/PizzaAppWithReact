import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import loginReg from '../../../imports/ui/components/accounts/loginReg.jsx';
import main from '../../../imports/ui/layouts/main.jsx';
import indexPage from '../../../imports/ui/components/index.jsx';
import notFoundPage from '../../../imports/ui/components/errors/notFoundPage.jsx';

import guestPage from '../../../imports/ui/components/pages/guestPanel';
import createGroup from '../../../imports/ui/components/userpanel/createGroup.jsx';
import invites from '../../../imports/ui/components/userpanel/invites.jsx';

import authenticatedUser from '../../../imports/ui/components/pages/authenticatedUser.jsx';

import adminPage from '../../../imports/ui/components/pages/adminPanel';
import sendInvite from '../../../imports/ui/components/userpanel/sendInvite.jsx';
import groupList from '../../../imports/ui/components/userpanel/groupList.jsx';

import userPage from '../../../imports/ui/components/pages/userPanel';

export const renderRoutes = () => (
    <Router history={ browserHistory }>
      <Route path="/" component={ main }>
        <IndexRoute component={ indexPage } />
        <Route path="loginreg" component={ loginReg } />
        <Route path="/panel" component={ authenticatedUser }>
          <Route path="guest" component={ guestPage }>
            <Route path="creategroup" component={ createGroup }/>
            <Route path="invites" component={ invites }/>
          </Route>
          <Route path="admin" component={ adminPage }>
             <Route path="sendinvite" component={ sendInvite }/>
             <Route path="grouplist" component={ groupList }/>
           </Route>
          <Route path="user" component={ userPage }/>
         </Route>
        </Route>
      <Route path="*" component={ notFoundPage } />
    </Router>
);
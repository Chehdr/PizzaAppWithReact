import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginReg from '../../../imports/ui/components/accounts/LoginReg.jsx';

import main from '../../../imports/ui/layouts/main.jsx'; // правильно? Наскільки я зрозумів прості функції по принципу camelCase
import index from '../../../imports/ui/components/index.jsx';
import notFoundPage from '../../../imports/ui/components/errors/notFoundPage.jsx';

import GuestPage from '../../../imports/ui/components/pages/GuestPanel';
import CreateGroup from '../../../imports/ui/components/userpanel/CreateGroup.jsx';
import Invites from '../../../imports/ui/components/userpanel/Invites.jsx';

import AuthenticatedUser from '../../../imports/ui/components/userpanel/AuthenticatedUser.jsx';
import redirectToPanel from '../../../imports/ui/components/userpanel/redirectToPanel.jsx';

import AdminPage from '../../../imports/ui/components/pages/AdminPanel';
import SendInvite from '../../../imports/ui/components/userpanel/SendInvite.jsx';
import Menu from '../../../imports/ui/components/userpanel/Menu.jsx';
import GroupList from '../../../imports/ui/components/userpanel/GroupList.jsx';
import Coupons from '../../../imports/ui/components/userpanel/Coupons.jsx';
import Events from '../../../imports/ui/components/userpanel/Events.jsx';
import Order from '../../../imports/ui/components/userpanel/Order.jsx';

import UserPage from '../../../imports/ui/components/pages/UserPanel';

export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ main }  >
      <IndexRoute component={ index } onEnter={ redirectToPanel }/>
      <Route path="loginreg" component={ LoginReg } />
      <Route path="/panel" component={ AuthenticatedUser } >
        <Route path="guest" component={ GuestPage }>
          <Route path="creategroup" component={ CreateGroup }/>
          <Route path="invites" component={ Invites }/>
        </Route>
        <Route path="admin" component={ AdminPage }>
          <Route path="sendinvite" component={ SendInvite }/>
          <Route path="grouplist" component={ GroupList }/>
          <Route path="menu" component={ Menu }/>
          <Route path="coupons" component={ Coupons }/>
          <Route path="events" component={ Events }/>
          <Route path="order/:id" component={ Order }/>
        </Route>
        <Route path="user" component={ UserPage }>
          <Route path="menu" component={ Menu }/>
          <Route path="events" component={ Events }/>
          <Route path="order/:id" component={ Order }/>
        </Route>
      </Route>
    </Route>
    <Route path="*" component={ notFoundPage } />
  </Router>
);
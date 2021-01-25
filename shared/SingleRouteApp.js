import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import config from 'utils/config';

// Layout
import Header from 'containers/header';
import Footer from 'containers/footer';
import AppLayout, { Content } from 'components/app-layout';
import DevTools from 'components/devtools';

// Routes
import SingleRoute from 'route';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />

      <Header />

      <Content>
        <Switch>
          <Route component={SingleRoute} />
        </Switch>
        <DevTools />
      </Content>

      <Footer />
    </AppLayout>
  );
}

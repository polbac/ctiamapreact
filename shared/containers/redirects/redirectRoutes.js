import React from 'react';
import { Route, Redirect } from 'react-router';
import Redirects from './Redirects';

export default [
  <Route key="about-ctia" path="/about-ctia" component={Redirects} />,
  <Route key="home" path="/home" component={Redirects} />,
  <Route key="industry-data" path="/industry-data" component={Redirects} />,
  <Route key="policy" path="/policy" component={Redirects} />,
  <Route key="business_resources" path="/business_resources" component={Redirects} />,
  <Route key="initiatives" path="/initiatives" component={Redirects} />,
  <Route key="consumer-tips" path="/consumer-tips" component={Redirects} />,
  <Route key="about" path="/about" component={Redirects} />,
  <Route key="footer-links" path="/footer-links" component={Redirects} />,
  <Route key="images" path="/images" component={Redirects} />,
  <Route key="docs" path="/docs" component={Redirects} />,
  <Route key="5Gin360" path="/5Gin360" component={Redirects} />,
  <Route key="connecting-kids" path="/connecting-kids" component={Redirects} />,
  <Route key="how-wireless-works" path="/how-wireless-works" component={Redirects} />,
  <Route key="what-is-spectrum" path="/what-is-spectrum" component={Redirects} />,
  <Route key="prepared" path="/prepared" component={Redirects} />,
  <Route key="fighting-robocalls" path="/fighting-robocalls" component={Redirects} />,
  <Route key="search" path="/search" component={Redirects} />,
  <Route key="your-wireless-life" path="/your-wireless-life" component={Redirects} />,
  <Route key="emergencias" path="/emergencias" component={Redirects} />,
  <Route key="MWCAaccessibility" path="/MWCAaccessibility" component={Redirects} />,
  <Route key="MWCApolicymakers" path="/MWCApolicymakers" component={Redirects} />,

  <Redirect key="consumer-resources" exact path="/consumer-resources/how-to-prepare-wireless-devices-for-emergencies/" to="/consumer-resources/emergency-preparedness" />,
  <Redirect key="certification" path="/certification" to="/about-ctia/programs/certification-resources" />,
  <Redirect key="florence" path="/florence" to="/news/the-wireless-industry-response-to-hurricane-florence" />,
];

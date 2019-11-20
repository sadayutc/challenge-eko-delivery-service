import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import RouteSet from '../pages/route/RouteSet';
import DeliveryCost from '../pages/route/DeliveryCost';
import PossibleDeliveryRoute from '../pages/route/PossibleDeliveryRoute';
import CheapestDeliveryRoute from '../pages/route/CheapestDeliveryRoute';
import { RouteProvider } from '../contexts/routeContext';

const Root = styled('div')({
  display: 'flex',
  maxWidth: '100vw',
  overflowX: 'hidden',
});

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const FakeToolbar = styled('div')(({ theme }) => ({ ...theme.mixins.toolbar }));

const Main = () => {
  return (
    <Root>
      <Header />
      <Sidebar />
      <RouteProvider>
        <Content>
          <FakeToolbar />
          <Switch>
            <Route path="/route/set" component={RouteSet} />
            <Route path="/route/delivery-cost" component={DeliveryCost} />
            <Route path="/route/possible-delivery-route" component={PossibleDeliveryRoute} />
            <Route path="/route/cheapest-delivery-route" component={CheapestDeliveryRoute} />
          </Switch>
        </Content>
      </RouteProvider>
    </Root>
  );
};

export default Main;

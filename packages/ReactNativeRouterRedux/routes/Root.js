import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Route, Switch } from 'react-router-native';
import Home from './Home';
import Splash from './Splash';
import About from './About';
import Nav from './Nav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Root = () => (
  <View style={styles.container}>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route component={Splash} />
    </Switch>
    <Nav />
  </View>
);

export default Root;
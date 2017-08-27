import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  link: {
    margin: 8,
    backgroundColor: 'lightgrey',
    padding: 4,
  },
});

// connect with a bind action creator shortcut
const Link = connect(null, { push })(
    ({ to, children, push }) => (
    <TouchableOpacity onPress={() => push(to)}>
      <View style={styles.link}>
        <Text>{ children }</Text>
      </View>
    </TouchableOpacity>
  )
);

const Nav = () => (
  <View>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/">Splash</Link>
  </View>
);

export default Nav;
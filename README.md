# React Native with redux and redux router

## Install

This tutorial will be for OSX. While you can run React Native Android with Windows, it's recommended you walk through this with a Mac.
 
First, [install node.js](https://nodejs.org/en/download/current/).

Second, make sure you've agreed to the xcodebuild license. You can do this by running `sudo xcodebuild -license` from your terminal. More info on getting the terminal open below.

Finally, if you don't have a global yarn installation, make one now. `npm i yarn -g`.

## Install

```
yarn global add create-react-native-app
```

## Scaffold

```
create-react-native-app AwesomeProject
```

## Run

```
cd AppWithRouter
npm start
```

## Adding libraries

Good news! This is still a javascript project. You can add most projects to your repository that don't rely on some node core libraries like `fs` or `http`. So that includes a ton of react stuff!

## Adding Redux and React Router

```
yarn add redux react-router-redux react-router-native react-router react-redux history
```

## Breaking up our app

It looks like `create-react-native-app` only gave us one React component. What gives? Where's our redux store and our router?

Turns out, you'll need to make those yourself!

### First: Make some new directories

```
mkdir routes redux
```

### Second: Make some new files

```
touch redux/index.js routes/Root.js routes/Home.js routes/Splash.js routes/About.js routes/Nav.js
```

## Redux Store

in `redux/index.js`

```js
import { createStore, combinedReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export default function createAppStore(state, history) {
  return createStore(
    combinedReducers({
      router: routerReducer,
    }),
    state,
    applyMiddleware(
      routerMiddleware(history),
    ),
  );
}
```

Here we need to export a function that creates our App's store. This function accepts the initial state of the store and the history for the router to use.

A few things should jump out at you.

First, we're following the [react-router-redux tutorial](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) by adding an appropriate reducer.

Second, we're passing in history to router middleware so the two will be in sync.

## Our Scene Components

in `routes/Home.js`

```js
import React from 'react';
import { View, Text } from 'react-native';

const Home = () => (
  <View>
    <Text>
      Home
    </Text>
  </View>
);

export default Home;
```

Not much going on here! Just the content we want to have in our scenes.

Because we're just making filler scenes - `Splash.js` and `About.js` look exactly the same.

Be sure to change the `Text` tag though! It's nice to know what scene you're actually on.

## Our Nav

in `Nav.js`

```js
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

const Link = connect(null, { push })(({ to, children, push }) => (
  <TouchableOpacity onPress={() => push(to)}>
    <View style={styles.link}>
      <Text>{ children }</Text>
    </View>
  </TouchableOpacity>
));

const Nav = () => (
  <View>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/">Splash</Link>
  </View>
);

export default Nav;
```

Ok we're having a little fun here. Looks like we need some links that work with redux. In order to do that we're using connect with a [bind action creator shortcut](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options). That's where we send the action creator `push` from `react-router-redux` to `connect`.

Second, we're adding three of these links to our component with each `to` property matching our future routes.

## Our Root Route

in `routes/Root.js`

```js
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
```

Here it is! We're bringing all of our routes together. Notice we aren't setting our default `Splash` view to `/` - it's better to just assume you start here - for now, anyway.

## Our Main App

in `App.js`

```js
import React from 'react';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createStore from './redux';
import Root from './routes/Root';

const INITIAL_STATE = {};

const history = createHistory();

const store = createStore(INITIAL_STATE, history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    );
  }
}
```

Finally! Now we need to add our providers together and export the darn thing. Here we'll put a redux provider at the root of the app and make sure our router gets the history that the reducer also depends on.

Go ahead and run `yarn run ios` and see your router in action!

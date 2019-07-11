import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Auth from "./screens/Auth";
import Chat from "./screens/Chat";
import SignOut from "./components/SignOut";
import Register from "./screens/Register";

const App = () => {
  return <AppContainer />;
};

const AuthRouter = createStackNavigator({
  Auth,
  Register
}, {
  headerMode: 'none'
});

const navigator = createStackNavigator({
  AuthRouter,
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerTitle: "Chat",
      headerRight: <SignOut />
    }
  }
}, {
  initialRouteName: "AuthRouter",
  defaultNavigationOptions: {
    title: "MixChat"
  }
});

const AppContainer = createAppContainer(navigator);

export default App;

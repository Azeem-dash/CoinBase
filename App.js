import React, {useState, useEffect} from 'react';
// import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './src/auth/authNavigator/index';
import Navigation from './src/homeNavigator/index';

export default function App() {
  const [init, setinit] = useState(true);
  const [user, setuser] = useState();

  // function AuthStateChange(user) {
  //   setuser(user);

  //   if (init) setinit(false);
  // }

  // useEffect(() => {
  //   const sub = auth().onAuthStateChanged(AuthStateChange);
  //   return sub;
  // });

  // if (init) return null;

  // if (!user) {
  //   return (
  //     <NavigationContainer>
  //       <AuthNavigator />
  //     </NavigationContainer>
  //   );
  // }

  if (!user)
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );
}

// import { useContext, useEffect, useState } from 'react';
// import { FirebaseContext } from '../context/FirebaseContext';

export const useAuth = () => {
  const user = {
    uid: '1234567890',
    displayName: 'Stephen White',
    photoURL: ''
  };

  // const firebase = useContext(FirebaseContext);
  // const [user, setUser] = useState(firebase.auth());

  // useEffect(() => {
  //   const authListener = firebase.auth().onAuthStateChanged((userChange) => {
  //     setUser(userChange);
  //   });
  //
  //   return authListener;
  // }, [user]);

  return { user };
  // return user;
};

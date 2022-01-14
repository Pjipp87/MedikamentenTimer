import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export const WelcomeScreen = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        /**
          * _getStatusUpdate();
          setCurrentUsernameFunc(user.email);
          setCurrentUserData({
            name: user.displayName,
            username: user.email,
            picture: user.photoURL,
            id: user.uid,
          });
  
          _setFriendOnline(user);
          _setUserList(user);
           */
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user]);

  return (
    <View style={styles.main}>
      <Text>Willkommen {userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

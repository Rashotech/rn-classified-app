import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

function HomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo-red.png")}/>
            <Text>Sell What you don't need</Text>
      </View>
      <View style={styles.loginButton}></View>
      <View style={styles.registerButton}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    top: 70,
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100
  },
  loginButton: {
    width: '100%',
    backgroundColor: "#fc5c65",
    height: 70
  },
  registerButton: {
    width: '100%',
    backgroundColor: "#4ecdc4",
    height: 70
  }
});

export default HomeScreen;

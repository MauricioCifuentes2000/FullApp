import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  content: {
    flex: 1,
    padding: 16, 
  },
});

export default ScreenWrapper;

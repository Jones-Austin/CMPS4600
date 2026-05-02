import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <Text
        style={{
          color: '#ff0000',
          fontFamily: 'Arial',
          fontSize: 50,
          fontStyle: 'italic',
          fontWeight: 'bold',
          lineHeight: 50,
          textAlign: 'auto',
        }}>
        Hello Yinzers
      </Text>
    </SafeAreaView>
  );
};

export default App;

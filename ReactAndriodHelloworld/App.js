import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View style={{
        borderWidth: 1, borderTopWidth: 5,
        borderBottomWidth: 10, borderLeftWidth: 3, borderRightWidth: 20,
        borderColor: '#33BEFF',
      }}>
        <Text>Hello Yinzers</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

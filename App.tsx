import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";

import sfProRegular from './assets/fonts/SF-Pro-Display-Regular.otf';
import BottomSheet from './src/components/BottomSheet';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'SF-Pro-Regular': sfProRegular,
      });
      setFontsLoaded(true);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {fontsLoaded && <BottomSheet />}
      </View>
    </SafeAreaProvider>
  );
}

import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { 
  useSharedValue, useAnimatedStyle, withSpring 
} from "react-native-reanimated";
import { 
  GestureHandlerRootView, Gesture, GestureDetector 
} from "react-native-gesture-handler";

import styles from "./styles";

export default function BottomSheet() {
  const screenHeight = Dimensions.get("screen").height;

  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(insets.top);
  const lastTranslateY = useSharedValue(0);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      marginTop: insets.top
    }
  })

  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastTranslateY.value = translateY.value;
    })

    .onUpdate((event) => {
      translateY.value = Math.max(
        insets.top,
        Math.min(
          screenHeight * 0.75,
          lastTranslateY.value + event.translationY
        )
      )
    })

    .onEnd((event) => {
      const shouldGoUp = 
        event.velocityY < -500 || 
        (translateY.value < screenHeight * 0.25 && event.velocityY > -500);

      translateY.value = withSpring(
        shouldGoUp ? insets.top : screenHeight * 0.75,
        {
          velocity: event.velocityY,
          damping: 20
        }
      );
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[rBottomSheetStyle, styles.bottomSheet, { height: screenHeight }]}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <Text style={styles.text}>
            Bottom Sheet Content
          </Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

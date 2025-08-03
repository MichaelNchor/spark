import React, { useState } from "react";
import { View, SafeAreaView, Dimensions, Pressable, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const TinderSwiper = ({ users }) => {
  const maxRotateAngle = 30;
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [nextUserIndex, setNextUserIndex] = useState(currentUserIndex + 1);
  const currentProfile = users[currentUserIndex];
  const nextProfile = users[nextUserIndex];
  const { width } = Dimensions.get("window");
  const hiddenTranslateX = width * 2;

  const translateX = useSharedValue(0);
  const rotateDeg = useDerivedValue(
    () =>
      interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, maxRotateAngle]
      ) + "deg"
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: rotateDeg.value }],
  }));

  const gestureHandler = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > width * 0.3) {
        translateX.value = withSpring(translateX.value > 0 ? width : -width);
      } else {
        translateX.value = withSpring(0);
      }
    });

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="absolute z-0 justify-center w-full h-[70vh] bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl">
        <SwipeCard user={nextProfile} />
      </View>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View
          style={[cardStyle]}
          className="absolute z-1 justify-center w-full h-[70vh] bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl"
        >
          <SwipeCard user={currentProfile} />
        </Animated.View>
      </GestureDetector>
      <Pressable
        onPress={() => {
          translateX.value = withSpring(Math.random());
        }}
      >
        <Text>Change Value</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default TinderSwiper;

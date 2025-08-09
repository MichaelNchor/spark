import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Dimensions, Pressable, Text } from "react-native";
import SwipeCard from "./SwipeCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolate,
  runOnJS,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const TinderSwiper = ({ users }) => {
  const maxRotateAngle = 60;
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const { width, height } = Dimensions.get("window");
  const hiddenTranslateX = width * 2;
  const velocityThreshold = 1000;
  const swipeThreshold = width * 0.3;

  const currentProfile = users[currentUserIndex];
  const nextProfile = users[currentUserIndex + 1];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (currentUserIndex < users.length) {
      translateX.value = 0;
      translateY.value = 0;
    }
  }, [currentProfile]);

  const rotateDeg = useDerivedValue(() => {
    return `${interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [-maxRotateAngle, 0, maxRotateAngle]
    )}deg`;
  });

  const currentCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value * 1.5 },
      { translateY: translateY.value },
      { rotate: rotateDeg.value },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, width * 0.3],
      [0.9, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [50, 120],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const passStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-120, -50],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const superLikeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-150, -100],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const setNextCard = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
    }
  };

  const gestureHandler = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const swipedRight =
        translateX.value > swipeThreshold || e.velocityX > velocityThreshold;
      const swipedLeft =
        translateX.value < -swipeThreshold || e.velocityX < -velocityThreshold;
      const superLiked =
        translateY.value < -150 || e.velocityY < -velocityThreshold;

      if (superLiked) {
        translateY.value = withSpring(-height, { velocity: e.velocityY });
        runOnJS(setNextCard)();
      } else if (swipedRight || swipedLeft) {
        translateX.value = withSpring(swipedRight ? width : -width, {
          velocity: e.velocityX,
        });
        runOnJS(setNextCard)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  return (
    <SafeAreaView className="bg-[#121212] w-full h-full">
      {currentUserIndex >= users.length ? (
        <View className="flex-1 items-center justify-center h-full">
          <Text className="font-poppins-bold text-2xl text-black">No more users</Text>
        </View>
      ) : (
        <>
          {/* Next card */}
          {nextProfile && (
            <View className="absolute z-0 justify-center w-full h-[70vh]">
              <Animated.View
                style={[nextCardStyle]}
                className="w-full h-full bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl"
              >
                <SwipeCard user={nextProfile} />
              </Animated.View>
            </View>
          )}

          {/* Current card */}
          <GestureDetector gesture={gestureHandler}>
            <Animated.View
              style={[currentCardStyle]}
              className="absolute z-1 justify-center w-full h-[70vh] bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl"
            >
              <SwipeCard user={currentProfile} />

              {/* LIKE Badge */}
              <Animated.View
                style={[likeStyle]}
                className="absolute top-6 left-5 bg-green-500 px-4 py-2 rounded-full"
              >
                <Text className="text-white font-bold text-base">LIKE</Text>
              </Animated.View>

              {/* PASS Badge */}
              <Animated.View
                style={[passStyle]}
                className="absolute top-6 right-5 bg-red-500 px-4 py-2 rounded-full"
              >
                <Text className="text-white font-bold text-base">PASS</Text>
              </Animated.View>

              {/* SUPER LIKE Badge */}
              <Animated.View
                style={[superLikeStyle]}
                className="absolute top-6 self-center bg-blue-500 px-5 py-2 rounded-full"
              >
                <Text className="text-white text-base font-bold">
                  SUPER LIKE
                </Text>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </SafeAreaView>
  );
};

export default TinderSwiper;

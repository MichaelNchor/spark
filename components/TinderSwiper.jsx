import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { View, SafeAreaView, Dimensions, Text } from "react-native";
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

const TinderSwiper = forwardRef(({ users }, ref) => {
  // Memoize window dimensions to avoid recalculation
  const windowDimensions = useMemo(() => Dimensions.get("window"), []);
  const { width, height } = windowDimensions;

  // Memoize constants
  const maxRotateAngle = 60;
  const hiddenTranslateX = width * 2;
  const velocityThreshold = 1000;
  const swipeThreshold = width * 0.3;

  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const currentProfile = users[currentUserIndex];
  const nextProfile = users[currentUserIndex + 1];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (currentUserIndex < users.length) {
      translateX.value = 0;
      translateY.value = 0;
    }
  }, [currentProfile, currentUserIndex, translateX, translateY, users.length]);

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
      [0, width * 0.4],
      [0.95, 1],
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

  const setNextCard = useCallback(() => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
    }
  }, [currentUserIndex, users.length]);

  // Programmatic swipe - memoized for performance with smooth spring config
  const swipe = useCallback((direction) => {
    const springConfig = {
      damping: 20,
      stiffness: 100,
      mass: 0.5,
    };
    if (direction === "left") {
      translateX.value = withSpring(-width, springConfig, () => runOnJS(setNextCard)());
    } else if (direction === "right") {
      translateX.value = withSpring(width, springConfig, () => runOnJS(setNextCard)());
    } else if (direction === "up") {
      translateY.value = withSpring(-height, springConfig, () => runOnJS(setNextCard)());
    }
  }, [translateX, width, setNextCard, translateY, height]);

  useImperativeHandle(ref, () => ({
    swipeLeft: () => swipe("left"),
    swipeRight: () => swipe("right"),
    swipeUp: () => swipe("up"),
  }));

  // Gesture for finger swipes with consistent spring config
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

      const springConfig = {
        damping: 20,
        stiffness: 100,
        mass: 0.5,
      };

      if (superLiked) {
        translateY.value = withSpring(-height, { ...springConfig, velocity: e.velocityY }, () => runOnJS(setNextCard)());
      } else if (swipedRight || swipedLeft) {
        translateX.value = withSpring(swipedRight ? width : -width, {
          ...springConfig,
          velocity: e.velocityX,
        }, () => runOnJS(setNextCard)());
      } else {
        translateX.value = withSpring(0, springConfig);
        translateY.value = withSpring(0, springConfig);
      }
    });

  return (
    <SafeAreaView className="w-full h-full">
      {currentUserIndex >= users.length ? (
        <View className="flex-1 items-center justify-center h-full">
          <Text className="font-poppins-light text-xl text-white">
            No more users
          </Text>
        </View>
      ) : (
        <>
          {/* Next card */}
          {nextProfile && (
            <View className="absolute z-0 justify-center w-full h-[78vh]">
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
              className="absolute z-1 justify-center w-full h-[78vh] bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl"
            >
              <SwipeCard user={currentProfile} />

              {/* LIKE Badge */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 40,
                    left: 20,
                    borderWidth: 3,
                    borderColor: "#4DED30",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    transform: [{ rotate: "-20deg" }],
                  },
                  likeStyle,
                ]}
              >
                <Text
                  style={{ color: "#4DED30", fontSize: 32, fontWeight: "bold" }}
                >
                  LIKE
                </Text>
              </Animated.View>

              {/* PASS Badge */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 40,
                    right: 20,
                    borderWidth: 3,
                    borderColor: "#E94057",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    transform: [{ rotate: "20deg" }],
                  },
                  passStyle,
                ]}
              >
                <Text
                  style={{ color: "#E94057", fontSize: 32, fontWeight: "bold" }}
                >
                  PASS
                </Text>
              </Animated.View>

              {/* SUPER LIKE Badge */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    bottom: 300,
                    alignSelf: "center",
                    borderWidth: 3,
                    borderColor: "#3b82f6",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    transform: [{ rotate: "0deg" }],
                  },
                  superLikeStyle,
                ]}
              >
                <Text
                  style={{ color: "#3b82f6", fontSize: 32, fontWeight: "bold" }}
                >
                  SUPER LIKE
                </Text>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </SafeAreaView>
  );
});

TinderSwiper.displayName = 'TinderSwiper';

export default TinderSwiper;

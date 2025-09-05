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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TinderSwiper = forwardRef(({ users }, ref) => {
  // Memoize window dimensions to avoid recalculation
  const windowDimensions = useMemo(() => Dimensions.get("window"), []);
  const { width, height } = windowDimensions;
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight();
  const BOTTONBOTTOM_SPACE = 46;
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

  const progress = useDerivedValue(() => {
    // how far horizontally (0..1)
    const px = Math.min(Math.abs(translateX.value) / (width * 0.4), 1);
    // how far vertically upward (0..1)
    const py = Math.min(Math.max(-translateY.value, 0) / (height * 0.6), 1);
    // respond to whichever gesture is stronger
    return Math.max(px, py);
  });

  // Add these derived values for badge gating
  const h = useDerivedValue(() => Math.abs(translateX.value));           // horizontal magnitude
  const vUp = useDerivedValue(() => Math.max(-translateY.value, 0));     // upward-only magnitude

  const currentCardStyle = useAnimatedStyle(() => {
    const shrink = interpolate(
      Math.max(-translateY.value, 0),
      [0, height * 0.6],
      [1, 0.98],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value * 1.5 },
        { translateY: translateY.value },
        { rotate: rotateDeg.value },
        { scale: shrink },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.95, 1], Extrapolation.CLAMP);
    const lift  = interpolate(progress.value, [0, 1], [20, 0], Extrapolation.CLAMP); // slight rise
    const opacity = interpolate(progress.value, [0, 1], [0.85, 1], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY: lift }, { scale }],
    };
  });

  // Only show LIKE if moving right and horizontal dominates
  const likeStyle = useAnimatedStyle(() => {
    const isRight = translateX.value > 0;
    const horizontalDominates = h.value >= vUp.value;
    const opacity = (isRight && horizontalDominates)
      ? interpolate(translateX.value, [40, 140], [0, 1], Extrapolation.CLAMP)
      : 0;
    return { opacity };
  });

  // Only show PASS if moving left and horizontal dominates
  const passStyle = useAnimatedStyle(() => {
    const isLeft = translateX.value < 0;
    const horizontalDominates = h.value >= vUp.value;
    const opacity = (isLeft && horizontalDominates)
      ? interpolate(-translateX.value, [40, 140], [0, 1], Extrapolation.CLAMP)
      : 0;
    return { opacity };
  });

  // Only show SUPER LIKE if moving upward and vertical dominates
  const superLikeStyle = useAnimatedStyle(() => {
    const verticalDominates = vUp.value > h.value;
    const opacity = verticalDominates
      ? interpolate(vUp.value, [60, 180], [0, 1], Extrapolation.CLAMP)
      : 0;
    return { opacity };
  });

  const setNextCard = useCallback(() => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
    }
  }, [currentUserIndex, users.length]);

  // Programmatic swipe - memoized for performance with smooth spring config
  const swipe = useCallback(
    (direction) => {
      const springConfig = {
        damping: 20,
        stiffness: 100,
        mass: 0.5,
      };
      const verticalSpringConfig = {
        damping: 18,
        stiffness: 90,
        mass: 0.5,
      };
      if (direction === "left") {
        translateX.value = withSpring(-width, springConfig, () =>
          runOnJS(setNextCard)()
        );
      } else if (direction === "right") {
        translateX.value = withSpring(width, springConfig, () =>
          runOnJS(setNextCard)()
        );
      } else if (direction === "up") {
        translateY.value = withSpring(-height, verticalSpringConfig, () =>
          runOnJS(setNextCard)()
        );
      }
    },
    [translateX, width, setNextCard, translateY, height]
  );

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
      const verticalSpringConfig = {
        damping: 18,
        stiffness: 90,
        mass: 0.5,
      };

      if (superLiked) {
        translateY.value = withSpring(
          -height,
          { ...verticalSpringConfig, velocity: e.velocityY },
          () => runOnJS(setNextCard)()
        );
      } else if (swipedRight || swipedLeft) {
        translateX.value = withSpring(
          swipedRight ? width : -width,
          {
            ...springConfig,
            velocity: e.velocityX,
          },
          () => runOnJS(setNextCard)()
        );
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
            <View
              className="absolute z-0 justify-center w-full"
              style={{
                height: height - 2.9 * (tabBarH + BOTTONBOTTOM_SPACE - insets.bottom * 2) + 15,
              }}
            >
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
              style={[
                currentCardStyle,
                { height: height - 2.9 * (tabBarH + BOTTONBOTTOM_SPACE - insets.bottom * 2) + 15 },
              ]}
              className="absolute z-1 justify-center w-full bg-gray-500 rounded-[30] shadow-gray-400 shadow-2xl"
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

TinderSwiper.displayName = "TinderSwiper";

export default TinderSwiper;

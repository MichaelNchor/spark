import React from "react";
import { Dimensions, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from "react-native-reanimated";
import LikeCard from "./LikeCard";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 0.25 * width;

const SwipeLikeCard = ({
  user,
  onSwipeLeft,
  onSwipeRight,
  onDragStart,
  onDragEnd,
}) => {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const isDragging = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
      { scale: isDragging.value ? 1.05 : 1 },
    ],
    // These help, but parent still must raise its own zIndex/elevation:
    zIndex: isDragging.value ? 999 : 0,
    elevation: isDragging.value ? 1000 : 4,
    shadowColor: "#000",
    shadowOpacity: isDragging.value ? 0.25 : 0.15,
    shadowRadius: isDragging.value ? 10 : 8,
    shadowOffset: { width: 0, height: isDragging.value ? 6 : 4 },
  }));

  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, width * 0.25],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const passStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-width * 0.25, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      isDragging.value = 1;
      if (onDragStart) runOnJS(onDragStart)(user);
    })
    .onChange((e) => {
      "worklet";
      translateX.value = e.translationX;
      rotate.value = (e.translationX / width) * 15;
    })
    .onEnd((e) => {
      "worklet";
      const dist = e.translationX;

      if (Math.abs(dist) > SWIPE_THRESHOLD) {
        if (dist > 0) {
          translateX.value = withTiming(width * 1.5, { duration: 180 }, () => {
            if (onSwipeRight) runOnJS(onSwipeRight)(user);
          });
        } else {
          translateX.value = withTiming(-width * 1.5, { duration: 180 }, () => {
            if (onSwipeLeft) runOnJS(onSwipeLeft)(user);
          });
        }
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
        isDragging.value = 0;
        if (onDragEnd) runOnJS(onDragEnd)();
      }
    })
    .onFinalize(() => {
      "worklet";
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ marginVertical: 0 }, cardStyle]}>
        <LikeCard user={user} />

        {/* MATCH */}
        <Animated.View
          pointerEvents="none"
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
          <Text style={{ color: "#4DED30", fontSize: 32, fontWeight: "bold" }}>
            MATCH
          </Text>
        </Animated.View>

        {/* PASS */}
        <Animated.View
          pointerEvents="none"
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
          <Text style={{ color: "#E94057", fontSize: 32, fontWeight: "bold" }}>
            PASS
          </Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeLikeCard;

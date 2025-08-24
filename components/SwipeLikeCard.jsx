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

const SwipeLikeCard = ({ user, onSwipeLeft, onSwipeRight }) => {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const isDragging = useSharedValue(0);

  // Card transform
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
        { scale: isDragging.value ? 1.05 : 1 }, // scale up while dragging
      ],
      zIndex: isDragging.value ? 100 : 0, // bring on top while dragging
    };
  });

  // "LIKE" opacity (when swiping right)
  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, width * 0.25],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // "PASS" opacity (when swiping left)
  const passStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-width * 0.25, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = 1; // start dragging
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = (event.translationX / width) * 15; // tilt card
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        if (event.translationX > 0) {
          // Swiped Right
          translateX.value = withTiming(width * 1.5, {}, () => {
            runOnJS(onSwipeRight)(user);
          });
        } else {
          // Swiped Left
          translateX.value = withTiming(-width * 1.5, {}, () => {
            runOnJS(onSwipeLeft)(user);
          });
        }
      } else {
        // Reset
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
      isDragging.value = 0; // reset drag state
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ marginVertical: 10 }, cardStyle]}>
        <LikeCard user={user} />

        {/* Overlay labels */}
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
          <Text style={{ color: "#4DED30", fontSize: 32, fontWeight: "bold" }}>
            MATCH
          </Text>
        </Animated.View>

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
          <Text style={{ color: "#E94057", fontSize: 32, fontWeight: "bold" }}>
            PASS
          </Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeLikeCard;

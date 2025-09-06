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
  Easing,
} from "react-native-reanimated";
import LikeCard from "./LikeCard";

const { width } = Dimensions.get("window");

// 🔧 Tunables
const DISTANCE_THRESHOLD = 0.22 * width;     // easier distance to trigger
const VELOCITY_THRESHOLD = 900;               // allow a fast flick to count
const OFFSCREEN_X = width * 1.6;              // how far it flies off-screen

// Spring presets
const SPRING_BACK = {
  damping: 16,
  stiffness: 220,
  mass: 0.8,
};

const SwipeLikeCard = ({
  user,
  onSwipeLeft,
  onSwipeRight,
  onDragStart,
  onDragEnd,
}) => {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const lift = useSharedValue(0);         // 0..1 smooth lift (scale/shadow/elevation)
  const isDragging = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => {
    // shadow/elevation + scale react to a smooth lift value
    const scale = interpolate(lift.value, [0, 1], [1, 1.04], Extrapolation.CLAMP);
    const shadowOpacity = interpolate(lift.value, [0, 1], [0.12, 0.25]);
    const shadowRadius = interpolate(lift.value, [0, 1], [6, 10]);
    const shadowDY = interpolate(lift.value, [0, 1], [4, 8]);
    const elevation = interpolate(lift.value, [0, 1], [4, 12]);

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
        { scale },
      ],
      zIndex: isDragging.value ? 999 : 0,      // keep stacking predictable
      elevation,
      shadowColor: "#000",
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: 0, height: shadowDY },
    };
  });

  // progress for labels
  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, width * 0.15, width * 0.35],
      [0, 0.4, 1],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      translateX.value,
      [0, width * 0.35],
      [0.95, 1],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ scale }] };
  });

  const passStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-width * 0.35, -width * 0.15, 0],
      [1, 0.4, 0],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      translateX.value,
      [-width * 0.35, 0],
      [1, 0.95],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ scale }] };
  });

  const reset = () => {
    "worklet";
    translateX.value = withSpring(0, SPRING_BACK);
    rotate.value = withSpring(0, SPRING_BACK);
    lift.value = withTiming(0, { duration: 140, easing: Easing.out(Easing.cubic) });
    isDragging.value = 0;
  };

  const flyOut = (dir, cb) => {
    "worklet";
    const target = dir > 0 ? OFFSCREEN_X : -OFFSCREEN_X;
    // a short timing to fly out feels crisp
    translateX.value = withTiming(target, { duration: 180, easing: Easing.out(Easing.cubic) }, () => {
      isDragging.value = 0;
      lift.value = 0;
      if (cb) runOnJS(cb)(user);
    });
  };

  const pan = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetX([-15, 15])      // activate with smaller horizontal travel
    .failOffsetY([-12, 12])        // fail if vertical travel grows → FlatList scroll wins
    .onStart(() => {
      "worklet";
      isDragging.value = 1;
      lift.value = withTiming(1, { duration: 120, easing: Easing.out(Easing.cubic) });
      if (onDragStart) runOnJS(onDragStart)(user);
    })
    .onChange((e) => {
      "worklet";
      translateX.value = e.translationX;
      rotate.value = (e.translationX / width) * 12; // slightly gentler tilt
    })
    .onEnd((e) => {
      "worklet";
      const distX = e.translationX;
      const absX = Math.abs(distX);
      const fast = Math.abs(e.velocityX) > VELOCITY_THRESHOLD;

      const shouldSwipe = absX > DISTANCE_THRESHOLD || (fast && absX > width * 0.18);

      if (shouldSwipe) {
        flyOut(distX, distX > 0 ? onSwipeRight : onSwipeLeft);
      } else {
        reset();
        if (onDragEnd) runOnJS(onDragEnd)();
      }
    })
    .onFinalize(() => {
      "worklet";
      // If it failed due to vertical scroll, ensure visuals reset
      if (!isDragging.value) return;
      if (Math.abs(translateX.value) < 6) {
        reset();
        if (onDragEnd) runOnJS(onDragEnd)();
      }
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

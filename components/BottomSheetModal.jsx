import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const BottomSheetModal = ({ visible, onClose, header, children }) => {
  const translateY = useSharedValue(height);
  const overlayOpacity = useSharedValue(0);
  const [isMounted, setIsMounted] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(0);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      overlayOpacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 150,
        mass: 0.4,
      });
    } else {
      overlayOpacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(
        sheetHeight || height,
        { duration: 200 },
        () => {
          runOnJS(setIsMounted)(false);
        }
      );
    }
  }, [visible, sheetHeight]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!isMounted) return null;

  return (
    <Animated.View
      style={[{ position: "absolute", inset: 0, zIndex: 30 }, overlayStyle]}
    >
      {/* Background overlay */}
      <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </BlurView>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          {
            backgroundColor: "#1c1c1c",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 15,
            paddingHorizontal: 20,
            paddingBottom: 30,
            position: "absolute",
            bottom: 0,
            width: "100%",
          },
          sheetStyle,
        ]}
        onLayout={(e) => setSheetHeight(e.nativeEvent.layout.height)}
      >
        {/* Header (optional) */}
        {header && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15
            }}
          >
            <Text className="font-poppins-medium text-base text-white">
              {header}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Children content */}
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default BottomSheetModal;

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Pressable,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";

const { height } = Dimensions.get("window");
const FOOTER_HEIGHT = 64;

const BottomSheetModal = ({
  visible,
  onClose,
  header,
  children,
  footer,
  primaryAction,
  secondaryAction,
}) => {
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(height);
  const overlayOpacity = useSharedValue(0);
  const dragStart = useSharedValue(0);
  const sheetH = useSharedValue(0);

  const [isMounted, setIsMounted] = useState(visible);
  const [modalKey, setModalKey] = useState(0);

  // unified close animation used by backdrop press & swipe down
  const closeWithAnimation = useCallback(() => {
    overlayOpacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(
      sheetH.value || height,
      { duration: 200 },
      (fin) => {
        if (fin) {
          runOnJS(setIsMounted)(false);
          if (onClose) runOnJS(onClose)();
        }
      }
    );
  }, [onClose]);

  // mount/unmount & open/close animations
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      setModalKey(prev => prev + 1); // Increment key to force fresh component instance
      // Reset shared values to initial state before opening
      translateY.value = height;
      overlayOpacity.value = 0;
      // Start opening animation
      overlayOpacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 150,
        mass: 0.4,
      });
    } else if (isMounted) {
      closeWithAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Cleanup animations when component unmounts
  useEffect(() => {
    return () => {
      // Cancel any ongoing animations
      translateY.value = height;
      overlayOpacity.value = 0;
    };
  }, []);

  // Android back button closes the sheet while visible
  useEffect(() => {
    if (!isMounted) return;

    const onBack = () => {
      closeWithAnimation();
      return true; // prevent default back action
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [isMounted, closeWithAnimation]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const hasBuiltInFooter = useMemo(
    () => !footer && (primaryAction || secondaryAction),
    [footer, primaryAction, secondaryAction]
  );

  const drag = Gesture.Pan()
    .onStart(() => {
      "worklet";
      dragStart.value = translateY.value;
    })
    .onChange((e) => {
      "worklet";
      const next = Math.max(0, dragStart.value + e.translationY);
      translateY.value = next;
      const norm = Math.min(next / 200, 1);
      overlayOpacity.value = 1 - norm * 0.9;
    })
    .onEnd((e) => {
      "worklet";
      const threshold = Math.max(120, (sheetH.value || height) * 0.18);
      const shouldClose = e.velocityY > 800 || translateY.value > threshold;

      if (shouldClose) {
        runOnJS(closeWithAnimation)();
      } else {
        overlayOpacity.value = withTiming(1, { duration: 150 });
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 150,
          mass: 0.4,
        });
      }
    });

  if (!isMounted) return null;

  return (
    <Portal>
      <GestureDetector gesture={drag}>
        <View
          style={{ position: "absolute", inset: 0, zIndex: 9999 }}
          // make sure we always sit above other views
          pointerEvents="box-none"
        >
          {/* Backdrop */}
          <Animated.View style={[{ position: "absolute", inset: 0 }, backdropStyle]}>
            <BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
              <Pressable style={{ flex: 1 }} onPress={closeWithAnimation} />
            </BlurView>
          </Animated.View>

          {/* Bottom Sheet */}
          <Animated.View
            style={[
              {
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 0,
                paddingHorizontal: 20,
                paddingBottom: 0,
                position: "absolute",
                bottom: 0,
                width: "100%",
                maxHeight: Math.floor(height * 0.9),
                // nice shadow
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: -4 },
                elevation: 16,
              },
              sheetStyle,
            ]}
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height;
              sheetH.value = h;
            }}
          >
            {/* Drag handle */}
            <View style={{ paddingTop: 8, paddingBottom: 6 }}>
              <View
                style={{
                  alignSelf: "center",
                  width: 44,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.15)",
                }}
              />
            </View>

            {/* Header */}
            {header && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 24,
                  paddingTop: 18,
                }}
              >
                <Text className="font-poppins-medium text-black text-xl">
                  {header}
                </Text>
              </View>
            )}

            {/* Content */}
            <View
              style={{
                paddingBottom:
                  (hasBuiltInFooter || footer ? FOOTER_HEIGHT : 16) +
                  insets.bottom +
                  8,
              }}
            >
              {children}
            </View>

            {/* Footer area */}
            {footer ? (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingHorizontal: 20,
                  paddingBottom: insets.bottom + 12,
                  paddingTop: 10,
                  backgroundColor: "white",
                  borderTopWidth: 1,
                  borderTopColor: "rgba(0,0,0,0.06)",
                }}
              >
                {footer}
              </View>
            ) : hasBuiltInFooter ? (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingHorizontal: 20,
                  paddingBottom: insets.bottom + 12,
                  paddingTop: 10,
                  backgroundColor: "white",
                  borderTopWidth: 1,
                  borderTopColor: "rgba(0,0,0,0.06)",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                {secondaryAction && (
                  <TouchableOpacity
                    onPress={secondaryAction.onPress}
                    activeOpacity={0.9}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text className="font-poppins-medium text-[#111827]">
                      {secondaryAction.label}
                    </Text>
                  </TouchableOpacity>
                )}
                {primaryAction && (
                  <TouchableOpacity
                    onPress={primaryAction.onPress}
                    activeOpacity={0.9}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <LinearGradient
                      colors={["#fd297b", "#ff5864", "#ff655b"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 999,
                      }}
                    >
                      <Text className="font-poppins-semibold text-white">
                        {primaryAction.label}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </Animated.View>
        </View>
      </GestureDetector>
    </Portal>
  );
};

export default BottomSheetModal;

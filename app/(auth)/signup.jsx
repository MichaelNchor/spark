import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  ZoomIn,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import CustomButton from "../../components/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLLAGE_H = Math.max(360, Math.min(320, width * 0.9));

const Circle = ({ uri, size = 86, style }) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#eee",
      },
      style,
    ]}
  >
    <Image
      source={{ uri }}
      style={{ width: "100%", height: "100%" }}
      contentFit="cover"
    />
  </View>
);

const BouncingCircle = ({
  uri,
  size = 72,
  angleDeg = 0, // where to sit around the hero
  radiusX, // ellipse radius X from center
  radiusY, // ellipse radius Y from center
  amp = 8, // bounce amplitude in px
  duration = 1800, // full cycle up->down duration (ms)
  delay = 0, // start offset
  zIndex = 4,
}) => {
  const bob = useSharedValue(0);

  React.useEffect(() => {
    bob.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-1, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(1, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.quad),
          })
        ),
        -1,
        true // reverse so it yoyo’s smoothly
      )
    );
  }, []);

  const style = useAnimatedStyle(() => {
    const θ = (angleDeg * Math.PI) / 180;
    const cx = COLLAGE_H / 2;
    const cy = COLLAGE_H / 2;

    // Base position on an ellipse around the hero
    const baseX = cx + radiusX * Math.cos(θ) - size / 2;
    const baseY = cy + radiusY * Math.sin(θ) - size / 2;

    return {
      position: "absolute",
      width: size,
      height: size,
      zIndex,
      transform: [
        { translateX: baseX },
        { translateY: baseY + bob.value * amp }, // vertical bounce only
      ],
    };
  });

  return (
    <Animated.View style={style} pointerEvents="none">
      <Circle uri={uri} size={size} />
    </Animated.View>
  );
};

const SignUp = () => {
  // --- shared values for looping ambience ---
  const bob = useSharedValue(0); // hero bobbing
  const pulse = useSharedValue(0); // background ring pulse
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Gentle hero bob (-6 to +6 px)
    bob.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        withTiming(6, { duration: 1400, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Soft pulse for the outer ring
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, []);

  const heroBobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bob.value }],
    };
  });

  const pulseRingStyle = useAnimatedStyle(() => {
    // scale from 1 → 1.06, opacity from .12 → .22
    const scale = 1 + pulse.value * 0.06;
    const opacity = 0.12 + pulse.value * 0.1;
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const innerDashedStyle = useAnimatedStyle(() => {
    // a subtle breathing scale
    const scale = 1 + pulse.value * 0.03;
    return { transform: [{ scale }] };
  });

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Screen fade-in */}
      <Animated.View entering={FadeIn.duration(500)}>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            paddingHorizontal: 24,
            paddingVertical: 32,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: insets.bottom || 12,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Collage Header --- */}
          <View
            style={{
              height: COLLAGE_H,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            {/* Soft concentric rings */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: COLLAGE_H * 0.9,
                  height: COLLAGE_H * 0.9,
                  borderRadius: (COLLAGE_H * 0.9) / 2,
                  backgroundColor: "rgba(253,41,123,0.1)",
                },
                pulseRingStyle,
              ]}
              entering={FadeIn.delay(80).duration(400)}
            />
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: COLLAGE_H * 0.68,
                  height: COLLAGE_H * 0.68,
                  borderRadius: (COLLAGE_H * 0.68) / 2,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  borderWidth: 2,
                  borderColor: "#fd297b",
                  borderStyle: "dashed",
                },
                innerDashedStyle,
              ]}
              entering={FadeIn.delay(120).duration(400)}
            />

            {/* Accent dots */}
            <Animated.View
              entering={ZoomIn.delay(180).springify()}
              style={{
                position: "absolute",
                left: width * 0.14,
                top: 22,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(253,41,123,0.5)",
              }}
            />
            <Animated.View
              entering={ZoomIn.delay(220).springify()}
              style={{
                position: "absolute",
                left: width * 0.22,
                top: 60,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(253,41,123,0.35)",
              }}
            />

            {/* Center hero (bobs gently) */}
            <Animated.View entering={ZoomIn.springify().damping(11)}>
              <Animated.View style={[heroBobStyle, { zIndex: 5 }]}>
                <Circle
                  uri="https://images.unsplash.com/photo-1650702970095-f5b8ebeebce5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  size={Math.min(160, COLLAGE_H * 0.48)}
                />
              </Animated.View>
            </Animated.View>

            {/* Fixed positions around hero + gentle bounce */}
            <View
              style={{
                position: "absolute",
                width: COLLAGE_H,
                height: COLLAGE_H,
              }}
              pointerEvents="none"
            >
              {/* Angles picked for clean spacing: 18°, 90°, 162°, 234°, 306° */}
              <BouncingCircle
                uri="https://images.unsplash.com/photo-1654129536570-e63ee22d3faf?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size={79}
                angleDeg={18}
                radiusX={COLLAGE_H * 0.39}
                radiusY={COLLAGE_H * 0.42}
                amp={7}
                duration={1900}
                delay={120}
                zIndex={4}
              />

              {/* Right side (over hero) */}
              <BouncingCircle
                uri="https://plus.unsplash.com/premium_photo-1703598728931-4a882dd9eb89?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size={96}
                angleDeg={90}
                radiusX={COLLAGE_H * 0.34}
                radiusY={COLLAGE_H * 0.40}
                amp={9}
                duration={2100}
                delay={260}
                zIndex={6} // above hero
              />

              <BouncingCircle
                uri="https://images.unsplash.com/photo-1681511005259-1959d5861ab7?q=80&w=739&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size={72}
                angleDeg={162}
                radiusX={COLLAGE_H * 0.35}
                radiusY={COLLAGE_H * 0.34}
                amp={6}
                duration={1750}
                delay={60}
                zIndex={4}
              />

              <BouncingCircle
                uri="https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size={82}
                angleDeg={234}
                radiusX={COLLAGE_H * 0.34}
                radiusY={COLLAGE_H * 0.38}
                amp={8}
                duration={2000}
                delay={340}
                zIndex={3}
              />

              <BouncingCircle
                uri="https://images.unsplash.com/photo-1607709498318-a9edd1baf021?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size={60}
                angleDeg={306}
                radiusX={COLLAGE_H * 0.28}
                radiusY={COLLAGE_H * 0.35}
                amp={10}
                duration={1500}
                delay={480}
                zIndex={3}
              />
            </View>
          </View>

          {/* --- Primary Actions --- */}
          <Animated.View
            className="w-full gap-3 mb-8"
            entering={FadeInDown.springify()
              .damping(12)
              .stiffness(220)
              .delay(240)}
          >
            <Animated.View entering={FadeInDown.springify().delay(260)}>
              <CustomButton
                text="Continue with email"
                handlePress={() => router.push("/steps/email")}
                containerStyles="w-full h-[48px]"
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.springify().delay(320)}>
              <CustomButton
                text="Use phone number"
                handlePress={() => router.push("/steps/phonenumber")}
                containerStyles="w-full h-[48px]"
                isOutline={true}
              />
            </Animated.View>
          </Animated.View>

          {/* --- Divider --- */}
          <Animated.View
            className="flex-row items-center my-6 w-full"
            entering={FadeInDown.springify().delay(360)}
          >
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-4 text-gray-500 font-poppins-regular text-sm">
              or sign up with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </Animated.View>

          {/* --- Social Auth --- */}
          <Animated.View
            className="flex-row items-center justify-center mb-10 mt-2"
            entering={FadeInDown.springify().delay(400)}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-apple" size={22} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
            >
              <Ionicons name="logo-google" size={20} color="#0F172A" />
            </TouchableOpacity>
          </Animated.View>

          {/* --- Footer link --- */}
          <Animated.View
            className="items-center"
            entering={FadeInDown.springify().delay(440)}
          >
            <Text className="text-xs font-poppins-regular text-gray-500">
              Already have an account?{" "}
              <Link
                href="/home"
                className="font-poppins-medium"
                style={{ color: "#E94057" }}
              >
                Sign In
              </Link>
            </Text>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SignUp;

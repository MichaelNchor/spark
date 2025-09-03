import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import icons from "../../assets/constants";
import TabButtonSection from "../../components/TabButtonSection";
import { dummyUsers, ProfileTabs } from "../../data/mockData";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const COLORS = {
  bg: "#F5F6FA",
  card: "#FFFFFF",
  line: "#E5E7EB",
  title: "#0F172A",
  sub: "#6B7280",
  icon: "#9CA3AF",
  brand: "#ff3366",
};

const SHADOW = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

const Settings = () => {
  const profileCompletion = 70;
  const size = 170;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [activeTab, setActiveTab] = useState("Account");

  const animatedOffset = useSharedValue(circumference);
  const [progress, setProgress] = useState(profileCompletion);
  const animatedPercent = useSharedValue(0);

  useEffect(() => {
    const progressLen = (profileCompletion / 100) * circumference;
    animatedOffset.value = withTiming(circumference - progressLen, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });
    animatedPercent.value = withTiming(profileCompletion, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });
    animatedPercent.value = withTiming(profileCompletion, {}, (finished) => {
      if (finished) runOnJS(setProgress)(profileCompletion);
    });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  const progressColor = profileCompletion >= 80 ? "#22C55E" : COLORS.brand;

  return (
    <SafeAreaView style={{ marginTop: 20, backgroundColor: COLORS.bg }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-center px-4 pt-4 my-4">
        <Image
          source={icons.logo}
          style={{ width: 80, height: 30 }}
          contentFit="cover"
        />
      </View>

      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: COLORS.bg }}
      >
        {/* Avatar + Progress */}
        <View className="flex justify-center items-center mt-4">
          <View className="justify-center items-center relative">
            <View
              style={{
                width: size,
                height: size,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Svg width={size} height={size} style={{ position: "absolute" }}>
                {/* Light track */}
                <Circle
                  fill="none"
                  stroke={COLORS.line}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <AnimatedCircle
                  fill="none"
                  stroke={progressColor}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  animatedProps={animatedProps}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${size / 2}, ${size / 2}`}
                />
              </Svg>

              <ImageBackground
                source={{ uri: dummyUsers[0].media[0].uri }}
                contentFit="cover"
                style={{
                  width: size - strokeWidth * 4,
                  height: size - strokeWidth * 4,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderRadius: (size - strokeWidth * 4) / 2,
                }}
                imageStyle={{ borderRadius: (size - strokeWidth * 4) / 2 }}
              >
                <Animated.View
                  style={{
                    backgroundColor: progressColor,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 16,
                    marginBottom: -15,
                    ...SHADOW,
                  }}
                >
                  <Animated.Text
                    className="font-poppins-semibold pt-1"
                    style={{ color: "white", fontSize: 12, fontWeight: "600" }}
                  >
                    {progress}% Complete
                  </Animated.Text>
                </Animated.View>
              </ImageBackground>
            </View>

            {/* Name + Verified */}
            <View className="flex-row gap-1 mt-6 justify-center">
              <Text
                className="text-xl font-poppins-medium"
                style={{ color: COLORS.title }}
              >
                {`${dummyUsers[0].name} ${dummyUsers[0].age}`}
              </Text>
              {dummyUsers[0].isVerified && (
                <Image
                  source={icons.verified}
                  style={{ width: 22, height: 22 }}
                  contentFit="contain"
                />
              )}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <TabButtonSection
          selectedValue={activeTab}
          options={ProfileTabs}
          onChange={setActiveTab}
        />

        {activeTab === "Account" && (
          <View className="w-full px-2">
            {/* Section 1 */}
            <Text
              className="text-base mb-3 font-poppins-regular"
              style={{ color: COLORS.sub }}
            >
              Account settings
            </Text>

            <View
              className="px-4 rounded-3xl mb-6"
              style={{ backgroundColor: COLORS.card, ...SHADOW }}
            >
              {/* Personal Info */}
              <TouchableOpacity
                className="flex-row justify-between items-center py-5 border-b"
                style={{ borderColor: COLORS.line }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={COLORS.sub}
                  />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    Personal information
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity
                className="flex-row justify-between items-center py-5 border-b"
                style={{ borderColor: COLORS.line }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={COLORS.sub}
                  />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    Notifications
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>

              {/* Time Spent */}
              <TouchableOpacity className="flex-row justify-between items-center py-5">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={20} color={COLORS.sub} />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    Time Spent
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Section 2 */}
            <Text
              className="text-base mb-3 font-poppins-regular"
              style={{ color: COLORS.sub }}
            >
              Help & Support
            </Text>

            <View
              className="px-4 rounded-3xl mb-6"
              style={{ backgroundColor: COLORS.card, ...SHADOW }}
            >
              {/* Privacy Policy */}
              <TouchableOpacity
                className="flex-row justify-between items-center py-5 border-b"
                style={{ borderColor: COLORS.line }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.sub}
                  />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    Privacy Policy
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>

              {/* Terms & Conditions */}
              <TouchableOpacity
                className="flex-row justify-between items-center py-5 border-b"
                style={{ borderColor: COLORS.line }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={COLORS.sub}
                  />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    Terms & Conditions
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>

              {/* FAQ */}
              <TouchableOpacity className="flex-row justify-between items-center py-5">
                <View className="flex-row items-center">
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color={COLORS.sub}
                  />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: COLORS.title }}
                  >
                    FAQ & Help
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Logout */}
            <TouchableOpacity
              className="rounded-3xl"
              style={{ backgroundColor: COLORS.card, ...SHADOW }}
            >
              <View className="flex-row justify-between items-center py-5 px-4">
                <View className="flex-row items-center">
                  <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                  <Text
                    className="ml-3 text-base font-poppins-medium"
                    style={{ color: "#ef4444" }}
                  >
                    Log out
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ef4444" />
              </View>
            </TouchableOpacity>

            <View style={{ height: 120 }} />
          </View>
        )}

        {activeTab === "Plans" && (
          <View className="space-y-4 px-2">
            <Text
              className="text-lg font-poppins-medium"
              style={{ color: COLORS.title }}
            >
              Security Settings
            </Text>
            <Text style={{ color: COLORS.sub }}>
              • Two-factor authentication: Enabled
            </Text>
            <Text style={{ color: COLORS.sub }}>• Login alerts: Active</Text>
            <Text style={{ color: COLORS.sub }}>• Face ID: Not set up</Text>
          </View>
        )}

        {activeTab === "Safety and Wellbeing" && (
          <View className="space-y-4 px-2">
            <Text
              className="text-lg font-poppins-medium"
              style={{ color: COLORS.title }}
            >
              App Settings
            </Text>
            <Text style={{ color: COLORS.sub }}>• Notifications: On</Text>
            <Text style={{ color: COLORS.sub }}>• Dark mode: Enabled</Text>
            <Text style={{ color: COLORS.sub }}>• Language: English</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

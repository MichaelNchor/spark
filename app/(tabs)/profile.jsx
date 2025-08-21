import { View, SafeAreaView, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { dummyUsers } from "../../data/mockData";
import TabButtonSection from "../../components/TabButtonSection";
import { runOnJS } from "react-native-reanimated";
import { ProfileTabs } from "../../data/mockData";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Profile = () => {
  const profileCompletion = 70; // Example percentage
  const size = 170;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Tabs
  const [activeTab, setActiveTab] = useState("Profile");

  // Shared values
  const animatedOffset = useSharedValue(circumference);
  const [progress, setProgress] = useState(profileCompletion);
  const animatedPercent = useSharedValue(0);

  // Animate on mount
  useEffect(() => {
    const progress = (profileCompletion / 100) * circumference;
    animatedOffset.value = withTiming(circumference - progress, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });
    animatedPercent.value = withTiming(profileCompletion, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });

    // listen for updates
    animatedPercent.value = withTiming(profileCompletion, {}, (finished) => {
      if (finished) {
        runOnJS(setProgress)(profileCompletion);
      }
    });
  }, []);

  // Animated props for circle
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: animatedOffset.value,
    };
  }, []);

  // // Derived value for percentage
  // const animatedValue = useDerivedValue(() =>
  //   Math.round(animatedPercent.value)
  // );

  // Dynamic color
  const progressColor = profileCompletion >= 80 ? "#4CAF50" : "#ff3366";

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
        <Image
          source={icons.logo}
          style={{ width: 120, height: 50 }}
          contentFit="cover"
        />
        <CustomButtonWithIcon
          icon={icons.settings}
          iconWidth={32}
          iconHeight={32}
          iconColor="#777777"
          containerStyles="w-[50px] h-[50px] items-start"
          isOutline={true}
        />
      </View>

      {/* Avatar + Animated Progress Circle */}
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
            {/* Circular Progress */}
            <Svg width={size} height={size} style={{ position: "absolute" }}>
              <Circle
                stroke="#333"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <AnimatedCircle
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

            {/* Avatar */}
            <ImageBackground
              source={{ uri: dummyUsers[0].media[0].uri }}
              contentFit="cover"
              style={{
                width: size - strokeWidth * 4,
                height: size - strokeWidth * 4,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              imageStyle={{ borderRadius: (size - strokeWidth * 4) / 2 }}
            >
              {/* Percentage pill */}
              <Animated.View
                style={{
                  backgroundColor: progressColor,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 16,
                  marginBottom: -15,
                }}
              >
                <Animated.Text
                  className="font-poppins-semibold pt-1"
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {progress}% Complete
                </Animated.Text>
              </Animated.View>
            </ImageBackground>
          </View>

          {/* Name + Verified */}
          <View className="flex-row gap-1 mt-6 justify-center">
            <Text className="text-xl text-white font-poppins-medium">
              {`${dummyUsers[0].name}, ${dummyUsers[0].age}`}
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

      {/* ✅ Tabs with TabButtonSection */}
      <TabButtonSection
        selectedValue={activeTab}
        options={ProfileTabs}
        onChange={setActiveTab}
      />

      {/* Tab Content */}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingBottom: 20,
          marginTop: 30,
        }}
      >
        {activeTab === "Profile" && (
          <View className="space-y-4">
            <Text className="text-lg text-white font-poppins-medium">
              Your Subscription Plan
            </Text>
            <Text className="text-gray-400">
              You are currently on the{" "}
              <Text className="text-pink-500">Free Plan</Text>. Upgrade to
              unlock premium features like unlimited swipes and video calls.
            </Text>
          </View>
        )}

        {activeTab === "Plans" && (
          <View className="space-y-4">
            <Text className="text-lg text-white font-poppins-medium">
              Security Settings
            </Text>
            <Text className="text-gray-400">
              • Two-factor authentication: Enabled
            </Text>
            <Text className="text-gray-400">• Login alerts: Active</Text>
            <Text className="text-gray-400">• Face ID: Not set up</Text>
          </View>
        )}

        {activeTab === "Safety and Wellbeing" && (
          <View className="space-y-4">
            <Text className="text-lg text-white font-poppins-medium">
              App Settings
            </Text>
            <Text className="text-gray-400">• Notifications: On</Text>
            <Text className="text-gray-400">• Dark mode: Enabled</Text>
            <Text className="text-gray-400">• Language: English</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

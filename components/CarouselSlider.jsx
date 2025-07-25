import { Image } from "expo-image";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const DATA = [
  {
    id: "1",
    title: "Algorithm",
    description:
      "Users go through vetting to ensure you never match with bots.",
    image: require("../assets/images/girl1.png"),
  },
  {
    id: "2",
    title: "Real People",
    description: "Only verified profiles for a genuine dating experience.",
    image: require("../assets/images/girl2.png"),
  },
  {
    id: "3",
    title: "Privacy First",
    description: "Your data is protected and never shared without consent.",
    image: require("../assets/images/girl3.png"),
  },
];

const renderItem = ({ width, height, isRounded = true }) =>
  ({ item, index }) => {
    return (
      <View className="items-center flex-1 gap-6" style={{ width }}>
        <Image
          source={item.image}
          className={`${isRounded ? "rounded-3xl" : ""}`}
          contentFit="contain"
          style={{ width: width, height: height * 0.82 }}
        />
        <Text className="text-3xl font-poppins-bold text-primary text-center">
          {item.title}
        </Text>
        <Text className="text-lg justify-center mx-12 text-center font-poppins-medium text-gray-500">
          {item.description}
        </Text>
      </View>
    );
  };

export default function OnboardingCarousel({
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height - 250,
}) {
  return (
    <View className="bg-white mb-6">
      <Carousel
        data={DATA}
        height={height}
        width={width}
        autoPlayInterval={2000}
        loop
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 100,
        }}
        renderItem={renderItem({ width, height, isRounded: true })}
      />
    </View>
  );
}
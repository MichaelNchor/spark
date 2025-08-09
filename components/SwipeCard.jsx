import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const SwipeCard = ({ user }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Pressable
      className="flex-1"
      onPress={(event) => {
        const tapX = event.nativeEvent.locationX;
        if (tapX > screenWidth / 2) {
          // Right tap
          setActiveIndex((prev) =>
            prev < user.media.length - 1 ? prev + 1 : prev
          );
        } else {
          // Left tap
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }}
    >
      <ImageBackground
        key={activeIndex}
        source={{ uri: user.media[activeIndex].uri }}
        contentFit="cover"
        style={{ height: "100%" }}
        imageStyle={{ borderRadius: 30 }}
      >
        {/* Top Progress Bar */}
        <View className="absolute flex w-full px-6 h-8 justify-center items-center rounded-3xl flex-row gap-1">
          {user.media.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => setActiveIndex(i)}
              className={`h-[5px] flex-1 rounded-full border-[0.5px] border-gray-500/50 ${
                i === activeIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </View>

        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "#121212"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />

        {/* Bottom Text Area */}
        <View className="h-full flex justify-end p-6">
          {/* Location Badge */}
          <View className="bg-[#E94057] px-3 py-1 rounded-full flex-row items-center mb-2 self-start">
            <Ionicons name="location-sharp" color="#fff" size={18} />
            <Text className="text-white text-sm ml-1">{user.location}</Text>
          </View>

          {/* User Info */}
          <Text className="text-2xl text-white font-poppins-semibold">
            {user.name}
          </Text>

          <Text className="text-base text-white font-poppins-light">
            {user.bio}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default SwipeCard;

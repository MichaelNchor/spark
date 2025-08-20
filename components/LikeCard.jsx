import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";
import { Image } from "expo-image";


const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 30) / 2;

const LikeCard = ({ user }) => {
  return (
    <Pressable style={{ width: cardWidth, marginBottom: 12 }}>
      <ImageBackground
        source={{ uri: user.media[0].uri }}
        contentFit="cover"
        style={{ height: 250, width: "100%" }}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "#121212"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />

        {/* Bottom Text Area */}
        <View className="h-full flex justify-end p-2">
          <View className="flex-row gap-1">
            {/* User Info */}
            <Text className="text-base text-white font-poppins-semibold">
              {user.name}
            </Text>
            {/* Verified */}
            {user.isVerified && (
              <Image
                source={icons.verified}
                style={{ width: 20, height: 20 }}
                contentFit="contain"
              />
            )}
          </View>

          {/* Location Badge */}
          <View className="py-1 rounded-full flex-row items-center self-start">
            <Ionicons name="location-sharp" color="#fff" size={14} />
            <Text className="text-white text-xs">{user.location.distance}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default LikeCard;

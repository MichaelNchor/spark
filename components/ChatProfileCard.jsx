import React, { useState } from "react";
import { View, Text, Dimensions, Pressable, TouchableOpacity } from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";
import { Image } from "expo-image";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const ChatProfileCard = ({ user }) => {
  return (
    <TouchableOpacity
      className="flex-row"
      style={{ width: screenWidth, marginBottom: 20 }}
      onPress={() => router.push(`/chat/${user.id}`)}
    >
      <ImageBackground
        source={{ uri: user.media[0].uri }}
        contentFit="cover"
        style={{ height: 60, width: 60 }}
        imageStyle={{ borderRadius: 50 }}
      />
      <View className="flex-col ml-4 justify-center py-2 items-start w-[70%] border-b-[0.5px] border-[#777777]">
        {/* Title Text Area */}
        <View className="flex-row justify-between mr-12">
          <View className="flex-row gap-1 justify-start items-center w-full">
            {/* User Info */}
            <Text className="text-lg text-white font-poppins-medium">
              {user.name}
            </Text>
            {/* Verified */}
            {user.isVerified && (
              <Image
                source={icons.verified}
                style={{ width: 14, height: 14 }}
                contentFit="contain"
              />
            )}
          </View>
          {/* Time */}
          <Text className="text-gray-400 text-sm font-poppins-medium">
            23min
          </Text>
        </View>

        {/* Bottom row: message + unread bubble */}
        <View className="flex-row w-full justify-between items-center mt-1">
          {/* Last message */}
          <Text
            className="text-base text-gray-200 font-poppins-light"
            numberOfLines={1}
          >
            Hey! What's up, long time...
          </Text>

          {/* Unread count */}
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: "#E94057",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-gray-200 text-sm font-poppins-medium">3</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatProfileCard;

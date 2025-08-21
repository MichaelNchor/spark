import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";
import { Image } from "expo-image";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 30) / 5;

const ChatStatusCard = ({ user }) => {
  return (
    <Pressable
      onPress={() => router.push(`user/${user.id}`)}
      style={{ width: cardWidth, marginBottom: 12 }}
    >
      <LinearGradient
        colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 2,
          borderRadius: 20,
        }}
      >
        <View className="">
          <ImageBackground
            source={{ uri: user.media[0].uri }}
            contentFit="cover"
            style={{ height: 90, width: "100%" }}
            imageStyle={{ borderRadius: 20 }}
          />
        </View>
      </LinearGradient>
      {/* Bottom Text Area */}
      <View className="flex-row gap-1 mt-4 justify-center">
        {/* User Info */}
        <Text className="text-xs text-white font-poppins-medium">
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
    </Pressable>
  );
};

export default ChatStatusCard;

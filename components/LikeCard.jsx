import React from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { ImageBackground, Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 30) / 2;
const isSuperLiked = true;

const LikeCard = ({ user }) => {
  return (
    <Pressable style={{ width: cardWidth, marginBottom: 12 }}>
      <ImageBackground
        source={{ uri: user.media[0].uri }}
        contentFit="cover"
        style={{ height: 250, width: "100%" }}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* SUPERLIKE Badge/Icon */}
        {isSuperLiked && (
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#3b82f6",
              padding: 6,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Ionicons name="star" size={20} color="white" />
          </View>
        )}

        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "#000000"]}
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
          <View className="flex-row gap-1 justify-start items-center">
            <Text
              className="text-lg text-white font-poppins-semibold"
              numberOfLines={1}
            >
              {user.name}
            </Text>
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
            <Image
              source={icons.location}
              style={{ width: 15, height: 15, tintColor: "white" }}
              contentFit="contain"
            />
            <Text
              className="text-white text-sm font-poppins-regular"
              numberOfLines={1}
            >
              {" "}
              {user.location.distance}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default LikeCard;

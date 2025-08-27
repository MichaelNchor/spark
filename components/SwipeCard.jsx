import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../assets/constants";
import { Image } from "expo-image";
import { router } from "expo-router";

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
          colors={["transparent", "#000000"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 350,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />

        {/* Bottom Text Area */}
        <View className="h-full flex justify-end p-6 pb-24">
          {/* {user.premiumPackage.isActive && (
            <View className="">
              <Text className="text-orange-300 font-poppins-medium uppercase">
                {user.premiumPackage.type}
              </Text>
            </View>
          )} */}

          <View className="flex-row items-center justify-between">
            {/* Left: User info */}
            <View className="flex-row gap-2 items-center">
              <Text className="text-3xl text-white font-poppins-medium">
                {user.name}
              </Text>
              <Text className="text-3xl text-white font-poppins-medium">
                {user.age}
              </Text>

              {user.isVerified && (
                <Image
                  source={icons.verified}
                  style={{ width: 30, height: 30 }}
                  contentFit="contain"
                />
              )}
            </View>

            {/* Right: Profile button */}
            <Pressable
              onPress={() => router.push(`/user/${user.id}`)}
              className="p-2 rounded-full bg-white/20"
            >
              <Image
                source={icons.up}
                style={{ width: 30, height: 30 }}
                contentFit="contain"
              />
            </Pressable>
          </View>

          {/* Location Badge */}
          <View className="py-1 flex-row items-center mb-2 self-start">
            <Image
              source={icons.location}
              style={{ width: 16, height: 25, tintColor: "white" }}
              contentFit="contain"
            />
            <Text className="text-white font-poppins-regular text-base ml-1">
              {user.location.place}
            </Text>
          </View>

          {/* Interests */}
          {user.interests?.length > 0 && (
            <View className="">
              <View className="flex-row flex-wrap">
                {user.interests?.slice(0, 5).map((interest, index) => (
                  <View
                    key={index}
                    className="px-2 rounded-full mr-2 mb-2 py-1"
                    style={{ backgroundColor: "rgba(128,128,128,0.6)" }}
                  >
                    <Text
                      className="text-gray-200 text-base font-poppins-regular"
                      numberOfLines={1}
                    >
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* <Text className="text-base text-white font-poppins-light">
            {user.bio}
          </Text> */}
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default SwipeCard;

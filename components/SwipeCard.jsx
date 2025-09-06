import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../assets/constants";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

// put near the top of the file
const SPARK_GRADIENT = ["#fd297b", "#ff5864", "#ff655b"]; // your theme
const DOT = 6;          // inactive dot size
const PILL_W = 24;      // active pill width
const PILL_H = 6;       // active pill height
const GAP = 6;          // spacing between dots

const SwipeCard = ({ user }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset activeIndex to 0 when user changes to prevent flickering
  useEffect(() => {
    setActiveIndex(0);
  }, [user.id]);
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
        imageStyle={{ borderRadius: 15 }}
      >
        {/* Top Progress (pill + dots) */}
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          pointerEvents="box-none"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: GAP,
            }}
          >
            {user.media.map((_, i) => {
              const isActive = i === activeIndex;

              if (isActive) {
                // gradient pill for the active item
                return (
                  <Pressable key={i} onPress={() => setActiveIndex(i)}>
                    <LinearGradient
                      colors={SPARK_GRADIENT}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: PILL_W,
                        height: PILL_H,
                        borderRadius: PILL_H / 2,
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 1 },
                        elevation: 2,
                      }}
                    />
                  </Pressable>
                );
              }

              // inactive dots
              return (
                <Pressable key={i} onPress={() => setActiveIndex(i)}>
                  <View
                    style={{
                      width: DOT,
                      height: DOT,
                      borderRadius: DOT / 2,
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
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
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
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
              className="rounded-full bg-white/20"
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
            <Text className="text-gray-200 font-poppins-regular text-sm ml-1">
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
                      className="text-gray-200 text-xs font-poppins-regular"
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

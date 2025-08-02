import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TinderSwiper = ({ users }) => {
  const images = users[0].media;
  const [activeIndex, setActiveIndex] = useState(0);
  const imageWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="justify-center w-full h-[70vh] bg-gray-500 rounded-[30] mt-[-40px] shadow-gray-400 shadow-2xl">
        <Pressable
          className="flex-1"
          onPress={(event) => {
            const tapX = event.nativeEvent.locationX;
            if (tapX > imageWidth / 2) {
              // Tapped right
              setActiveIndex((prev) =>
                prev < images.length - 1 ? prev + 1 : prev
              );
            } else {
              // Tapped left
              setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
            }
          }}
        >
          {/*card*/}
          <ImageBackground
            key={activeIndex}
            source={{
              uri: images[activeIndex].uri,
            }}
            contentFit="cover"
            style={{
              height: "100%",
            }}
            imageStyle={{
              borderRadius: 30,
            }}
          >
            <View className="absolute flex w-full px-6 h-8 justify-center items-center rounded-3xl flex-row gap-1">
              {images.map((_, i) => (
                <Pressable
                  key={i}
                  onPress={() => setActiveIndex(i)}
                  className={`h-[5px] flex-1 rounded-full ${
                    i === activeIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </View>
            {/* 🔥 Gradient for better text visibility */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
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
            <View className="h-full flex justify-end p-6">
              {/* Location Badge */}
              <View className="bg-[#E94057] px-3 py-1 rounded-full flex-row items-center mb-2 self-start">
                <Ionicons name="location-sharp" color="#fff" size={18} />
                <Text className="text-white text-sm ml-1">Near By</Text>
              </View>

              {/* User Name */}
              <Text className="text-2xl text-white font-poppins-semibold">
                {users[0].name}
              </Text>

              <Text className="text-base text-white font-poppins-light">
                Figuring Things out
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TinderSwiper;
